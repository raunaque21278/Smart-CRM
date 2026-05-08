from pydantic import BaseModel
from typing import Optional


class RegisterSchema(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "USER"   # default role


class LoginSchema(BaseModel):
    email: str
    password: str


class ContactSchema(BaseModel):
    name: str
    email: str
    phone: str
    company: str
    status: Optional[str] = "Active"
    source: Optional[str] = "Website"


class LeadSchema(BaseModel):
    name: str
    email: str
    phone: str
    company: str
    status: Optional[str] = "NEW"
    priority: Optional[str] = "Medium"
    assigned_to: Optional[int] = None


class DealSchema(BaseModel):
    title: str
    amount: float
    client: str
    stage: Optional[str] = "Proposal"
    assigned_to: Optional[int] = None


class TicketSchema(BaseModel):
    title: str
    description: str
    priority: Optional[str] = "Medium"
    status: Optional[str] = "Open"
    assigned_to: Optional[int] = None


class VerifyOTPSchema(BaseModel):
    email: str
    otp: str


class ForgotPasswordSchema(BaseModel):
    email: str


class ResetPasswordSchema(BaseModel):
    email: str
    otp: str
    new_password: str