export interface User {
    uid: string;
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    location: string;
    points: number;
    settingsUser: { language: string, type: string };
}
