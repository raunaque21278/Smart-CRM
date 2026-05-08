from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Contact, Lead, Deal, Ticket
from app.schemas import RegisterSchema, LoginSchema, ContactSchema, LeadSchema, DealSchema, TicketSchema
from app.auth import hash_password, verify_password, create_token, get_current_user, require_admin
from app.schemas import VerifyOTPSchema, ForgotPasswordSchema, ResetPasswordSchema
from app.auth import generate_otp

router = APIRouter()


@router.post("/auth/register")
def register(data: RegisterSchema, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    otp = generate_otp()

    allowed_roles = ["USER", "ADMIN"]

    if data.role not in allowed_roles:
        raise HTTPException(status_code=400, detail="Role must be USER or ADMIN")

    user = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role=data.role,
        otp=otp,
        is_verified="false"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "User registered successfully. Verify OTP to activate account.",
        "email": user.email,
        "role": user.role,
        "otp_for_testing": otp
    }

@router.post("/auth/verify-otp")
def verify_otp(data: VerifyOTPSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.otp != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    user.is_verified = "true"
    user.otp = None

    db.commit()

    return {
        "message": "Account verified successfully"
    }
    
@router.post("/auth/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if user.is_verified != "true":
        raise HTTPException(
            status_code=403,
            detail="Account not verified. Please verify OTP first."
        )

    token = create_token({
        "id": user.id,
        "email": user.email,
        "role": user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }
    
@router.post("/auth/forgot-password")
def forgot_password(data: ForgotPasswordSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp = generate_otp()
    user.otp = otp
    db.commit()

    return {
        "message": "OTP generated for password reset",
        "otp_for_testing": otp
    }
    
@router.post("/auth/reset-password")
def reset_password(data: ResetPasswordSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.otp != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    user.password = hash_password(data.new_password)
    user.otp = None

    db.commit()

    return {
        "message": "Password reset successfully"
    }


@router.get("/auth/me")
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/contacts")
def create_contact(data: ContactSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    contact = Contact(**data.dict(), created_by=current_user.id)
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact


@router.get("/contacts")
def get_contacts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role == "ADMIN":
        return db.query(Contact).order_by(Contact.id.desc()).all()

    return db.query(Contact).filter(
        Contact.created_by == current_user.id
    ).order_by(Contact.id.desc()).all()


@router.put("/contacts/{contact_id}")
def update_contact(contact_id: int, data: ContactSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    contact = db.query(Contact).filter(Contact.id == contact_id).first()

    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    for key, value in data.dict().items():
        setattr(contact, key, value)

    db.commit()
    db.refresh(contact)
    return contact


@router.delete("/contacts/{contact_id}")
def delete_contact(
    contact_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    contact = db.query(Contact).filter(Contact.id == contact_id).first()

    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    if current_user.role != "ADMIN" and contact.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="You can delete only your own contacts")

    db.delete(contact)
    db.commit()

    return {"message": "Contact deleted successfully"}


@router.post("/leads")
def create_lead(data: LeadSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    lead = Lead(**data.dict(), created_by=current_user.id)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


@router.get("/leads")
def get_leads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role == "ADMIN":
        return db.query(Lead).order_by(Lead.id.desc()).all()

    return db.query(Lead).filter(
        Lead.created_by == current_user.id
    ).order_by(Lead.id.desc()).all()


@router.put("/leads/{lead_id}")
def update_lead(lead_id: int, data: LeadSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    for key, value in data.dict().items():
        setattr(lead, key, value)

    db.commit()
    db.refresh(lead)
    return lead


@router.delete("/leads/{lead_id}")
def delete_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    if current_user.role != "ADMIN" and lead.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="You can delete only your own leads")

    db.delete(lead)
    db.commit()

    return {"message": "Lead deleted successfully"}

    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    db.delete(lead)
    db.commit()

    return {"message": "Lead deleted successfully"}


@router.post("/deals")
def create_deal(data: DealSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deal = Deal(**data.dict())
    db.add(deal)
    db.commit()
    db.refresh(deal)
    return deal


@router.get("/deals")
def get_deals(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Deal).order_by(Deal.id.desc()).all()


@router.put("/deals/{deal_id}")
def update_deal(deal_id: int, data: DealSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deal = db.query(Deal).filter(Deal.id == deal_id).first()

    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    for key, value in data.dict().items():
        setattr(deal, key, value)

    db.commit()
    db.refresh(deal)
    return deal


@router.delete("/deals/{deal_id}")
def delete_deal(deal_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deal = db.query(Deal).filter(Deal.id == deal_id).first()

    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    db.delete(deal)
    db.commit()

    return {"message": "Deal deleted successfully"}


@router.post("/tickets")
def create_ticket(data: TicketSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ticket = Ticket(**data.dict())
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket


@router.get("/tickets")
def get_tickets(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Ticket).order_by(Ticket.id.desc()).all()


@router.put("/tickets/{ticket_id}")
def update_ticket(ticket_id: int, data: TicketSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    for key, value in data.dict().items():
        setattr(ticket, key, value)

    db.commit()
    db.refresh(ticket)
    return ticket


@router.delete("/tickets/{ticket_id}")
def delete_ticket(ticket_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    db.delete(ticket)
    db.commit()

    return {"message": "Ticket deleted successfully"}


@router.get("/dashboard/stats")
def dashboard_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total_contacts = db.query(Contact).count()
    total_leads = db.query(Lead).count()
    total_deals = db.query(Deal).count()
    total_tickets = db.query(Ticket).count()
    open_tickets = db.query(Ticket).filter(Ticket.status == "Open").count()

    won_deals = db.query(Deal).filter(Deal.stage == "Won").all()
    total_revenue = sum(deal.amount for deal in won_deals)

    return {
        "total_contacts": total_contacts,
        "total_leads": total_leads,
        "total_deals": total_deals,
        "total_tickets": total_tickets,
        "open_tickets": open_tickets,
        "total_revenue": total_revenue
    }
    
@router.get("/admin/users")
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    users = db.query(User).order_by(User.id.desc()).all()

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_verified": user.is_verified,
            "created_at": user.created_at
        }
        for user in users
    ]


@router.put("/admin/users/{user_id}")
def update_user_role(
    user_id: int,
    role: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if role not in ["USER", "ADMIN"]:
        raise HTTPException(status_code=400, detail="Role must be USER or ADMIN")

    user.role = role
    db.commit()
    db.refresh(user)

    return {"message": "User role updated successfully"}


@router.delete("/admin/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    if current_user.id == user_id:
        raise HTTPException(status_code=400, detail="Admin cannot delete own account")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}

@router.get("/admin/analytics")
def admin_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    total_users = db.query(User).count()
    total_contacts = db.query(Contact).count()
    total_leads = db.query(Lead).count()
    total_deals = db.query(Deal).count()
    total_tickets = db.query(Ticket).count()

    won_deals = db.query(Deal).filter(Deal.stage == "Won").all()
    revenue = sum(deal.amount for deal in won_deals)

    return {
        "total_users": total_users,
        "total_contacts": total_contacts,
        "total_leads": total_leads,
        "total_deals": total_deals,
        "total_tickets": total_tickets,
        "revenue": revenue
    }