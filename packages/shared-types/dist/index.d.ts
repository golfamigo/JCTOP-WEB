export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    googleId?: string;
    passwordHash?: string;
    authProvider: 'email' | 'google' | 'line' | 'apple';
    role?: 'user' | 'organizer' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}
export interface Event {
    id: string;
    organizerId: string;
    categoryId?: string;
    venueId?: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    status: 'draft' | 'published' | 'unpublished' | 'paused' | 'ended';
    createdAt: Date;
    updatedAt: Date;
}
export interface Category {
    id: string;
    name: string;
    description: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Venue {
    id: string;
    name: string;
    address: string;
    city: string;
    capacity: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface TicketType {
    id: string;
    eventId: string;
    name: string;
    price: number;
    quantity: number;
}
export interface SeatingZone {
    id: string;
    eventId: string;
    name: string;
    capacity: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface DiscountCode {
    id: string;
    eventId: string;
    code: string;
    type: 'percentage' | 'fixed_amount';
    value: number;
    usageCount: number;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface PasswordResetToken {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
}
export interface HealthStatus {
    status: 'ok' | 'error';
    database: {
        status: 'connected' | 'disconnected';
        message?: string;
    };
    timestamp: string;
}
export interface CreateEventDto {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    location: string;
    categoryId?: string;
    venueId?: string;
}
export interface CreateTicketTypeDto {
    name: string;
    price: number;
    quantity: number;
}
export interface UpdateTicketTypeDto {
    name?: string;
    price?: number;
    quantity?: number;
}
export interface CreateSeatingZoneDto {
    name: string;
    capacity: number;
    description?: string;
}
export interface CreateDiscountCodeDto {
    code: string;
    type: 'percentage' | 'fixed_amount';
    value: number;
    expiresAt?: string;
}
export interface UpdateDiscountCodeDto {
    code?: string;
    type?: 'percentage' | 'fixed_amount';
    value?: number;
    expiresAt?: string;
}
export interface DiscountCodeResponse {
    id: string;
    eventId: string;
    code: string;
    type: 'percentage' | 'fixed_amount';
    value: number;
    usageCount: number;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface UpdateEventStatusDto {
    status: 'draft' | 'published' | 'unpublished' | 'paused' | 'ended';
    reason?: string;
}
export interface EventStatusChangeDto {
    eventId: string;
    previousStatus: 'draft' | 'published' | 'unpublished' | 'paused' | 'ended';
    newStatus: 'draft' | 'published' | 'unpublished' | 'paused' | 'ended';
    changedBy: string;
    changedAt: Date;
    reason?: string;
}
export interface PaginationMetadata {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationMetadata;
}
export interface EventWithRelations extends Event {
    category?: Category;
    venue?: Venue;
    ticketTypes?: TicketType[];
}
export type PaginatedEventsResponse = PaginatedResponse<EventWithRelations>;
export interface TicketTypeWithAvailability {
    id: string;
    eventId: string;
    name: string;
    price: number;
    totalQuantity: number;
    availableQuantity: number;
    soldQuantity: number;
}
export interface TicketSelection {
    ticketTypeId: string;
    quantity: number;
}
export interface TicketSelectionValidationRequest {
    selections: TicketSelection[];
}
export interface TicketSelectionValidationResponse {
    valid: boolean;
    errors?: {
        ticketTypeId: string;
        message: string;
    }[];
}
export interface CustomRegistrationField {
    id: string;
    eventId: string;
    fieldName: string;
    fieldType: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea';
    label: string;
    placeholder?: string;
    required: boolean;
    options?: string[];
    validationRules?: {
        minLength?: number;
        maxLength?: number;
        pattern?: string;
    };
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface RegistrationFormData {
    ticketSelections: TicketSelection[];
    customFieldValues: Record<string, any>;
    discountCode?: string;
    totalAmount: number;
    discountAmount?: number;
}
export interface CustomFieldResponse {
    fields: CustomRegistrationField[];
}
export interface DiscountValidationRequest {
    code: string;
    totalAmount: number;
}
export interface DiscountValidationResponse {
    valid: boolean;
    discountAmount: number;
    finalAmount: number;
    errorMessage?: string;
}
export interface PaymentProvider {
    id: string;
    organizerId: string;
    providerId: string;
    providerName: string;
    credentials: string;
    configuration: Record<string, any>;
    isActive: boolean;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Payment {
    id: string;
    organizerId: string;
    resourceType: string;
    resourceId: string;
    providerId: string;
    providerTransactionId?: string;
    merchantTradeNo: string;
    amount: number;
    discountAmount?: number;
    finalAmount: number;
    currency: string;
    paymentMethod: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
    providerResponse?: Record<string, any>;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
export interface PaymentTransaction {
    id: string;
    paymentId: string;
    type: 'charge' | 'refund' | 'partial_refund' | 'chargeback';
    status: 'pending' | 'processing' | 'completed' | 'failed';
    amount: number;
    providerTransactionId?: string;
    providerResponse?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
export interface PaymentRequest {
    organizerId: string;
    resourceType: string;
    resourceId: string;
    amount: number;
    currency: string;
    description: string;
    preferredProviderId?: string;
    paymentMethod?: string;
    metadata?: Record<string, any>;
    callbackUrl?: string;
}
export interface PaymentResponse {
    paymentId: string;
    status: 'pending' | 'requires_action' | 'processing' | 'completed' | 'failed';
    redirectUrl?: string;
    clientSecret?: string;
    providerData?: Record<string, any>;
    amount: number;
    currency: string;
}
export interface PaymentStatusResponse {
    payment: Payment;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
}
export interface PaymentProviderDto {
    providerId: string;
    providerName: string;
    credentials: Record<string, any>;
    configuration?: Record<string, any>;
    isActive?: boolean;
    isDefault?: boolean;
}
export interface UpdatePaymentProviderDto {
    credentials?: Record<string, any>;
    configuration?: Record<string, any>;
    isActive?: boolean;
    isDefault?: boolean;
}
export interface ECPayCredentials {
    merchantId: string;
    hashKey: string;
    hashIV: string;
    environment: 'development' | 'production';
    returnUrl?: string;
}
export interface ECPayPaymentRequest {
    MerchantID: string;
    MerchantTradeNo: string;
    MerchantTradeDate: string;
    PaymentType: string;
    TotalAmount: number;
    TradeDesc: string;
    ItemName: string;
    ReturnURL: string;
    ChoosePayment: string;
    CheckMacValue: string;
}
export interface ECPayCallbackResponse {
    MerchantID: string;
    MerchantTradeNo: string;
    RtnCode: number;
    RtnMsg: string;
    TradeNo: string;
    TradeAmt: number;
    PaymentDate: string;
    PaymentType: string;
    CheckMacValue: string;
}
export interface IPaymentProvider {
    readonly providerId: string;
    validateCredentials(credentials: Record<string, any>): Promise<boolean>;
    createPayment(request: PaymentRequest & {
        paymentId: string;
        callbackUrl: string;
    }, credentials: Record<string, any>): Promise<PaymentResponse>;
    validateCallback(callbackData: any, credentials: Record<string, any>): Promise<boolean>;
    processCallback(callbackData: any, payment: Payment): Promise<PaymentUpdate>;
}
export interface PaymentUpdate {
    paymentId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
    providerTransactionId?: string;
    providerResponse?: Record<string, any>;
}
export interface Registration {
    id: string;
    userId: string;
    eventId: string;
    status: 'pending' | 'paid' | 'cancelled' | 'checkedIn';
    paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
    paymentId?: string;
    qrCode?: string;
    totalAmount: number;
    discountAmount?: number;
    finalAmount: number;
    customFieldValues: Record<string, any>;
    ticketSelections: Array<{
        ticketTypeId: string;
        quantity: number;
        price: number;
    }>;
    checkedInAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    event?: Event;
    payment?: Payment;
}
export interface EventReport {
    eventId: string;
    eventDetails: Event;
    registrationStats: RegistrationStats;
    revenue: RevenueStats;
    attendanceStats: AttendanceStats;
    timeline: TimelineDataPoint[];
    generatedAt: string;
}
export interface RegistrationStats {
    total: number;
    byStatus: {
        pending: number;
        paid: number;
        cancelled: number;
        checkedIn: number;
    };
    byTicketType: TicketTypeStats[];
}
export interface TicketTypeStats {
    ticketTypeId: string;
    ticketTypeName: string;
    quantitySold: number;
    revenue: number;
}
export interface RevenueStats {
    gross: number;
    discountAmount: number;
    net: number;
    byTicketType: TicketTypeStats[];
}
export interface AttendanceStats {
    registered: number;
    checkedIn: number;
    rate: number;
    lastCheckInTime?: string;
}
export interface TimelineDataPoint {
    date: string;
    registrations: number;
    revenue: number;
    cumulativeRegistrations: number;
    cumulativeRevenue: number;
}
export interface InvoiceSettings {
    id: string;
    eventId: string;
    companyName?: string;
    companyAddress?: string;
    taxNumber?: string;
    invoicePrefix?: string;
    invoiceFooter?: string;
    customFields?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}
