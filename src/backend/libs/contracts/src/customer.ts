// Customer DTOs

export interface CreateCustomerDto {
  userId: string;
  ssnLast4?: string;
  dateOfBirth?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  goals?: string[];
  referralSource?: string;
}

export interface UpdateCustomerDto {
  ssnLast4?: string;
  dateOfBirth?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  goals?: string[];
}

export interface CustomerDto {
  id: string;
  userId: string;
  ssnLast4?: string;
  dateOfBirth?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  goals: string[];
  subscriptionTier: "NONE" | "BASIC" | "PREMIER" | "PREMIER_PLUS";
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerWithUserDto extends CustomerDto {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
}

