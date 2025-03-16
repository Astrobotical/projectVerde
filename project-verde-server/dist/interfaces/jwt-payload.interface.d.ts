export interface JwtPayload {
    email: string;
    sub: string;
    seekerId?: string;
    ownerId?: string;
    professionalId?: string;
}
