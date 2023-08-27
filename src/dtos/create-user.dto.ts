export interface CreateUser {
    body: {
      name: string;
      email: string;
      address?: string;
    };
  }
  
  