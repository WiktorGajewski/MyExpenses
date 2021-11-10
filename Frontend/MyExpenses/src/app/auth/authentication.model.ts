export interface IAuthentication{
    isAuthenticated: boolean,
    token: string,
    durationInMinutes: number
}