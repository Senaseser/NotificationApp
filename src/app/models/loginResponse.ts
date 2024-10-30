export interface Login {
    token: string;
    mail: string;
    role: string;
    id:string;
  }
  export interface LoginUser {
    token: string;
    mail: string;
    role: string;
    id:string;
    notifications:Notification[];
  }
  export interface Logout {
   message:string;
  }
  export interface Notification {
  userId:string;
  title:string;
  message:string;
  }