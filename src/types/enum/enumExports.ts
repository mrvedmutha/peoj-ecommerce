export enum Roles {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  INVENTORY = "inventory",
  EDITOR = "editor",
  MARKETER = "marketer",
  CUSTOMER = "customer",
}

export enum ShippingStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  TEST = "test",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum PaymentMethod {
  PREPAID = "prepaid",
  COD = "cod",
  PARTIAL_COD = "partial_cod",
}
