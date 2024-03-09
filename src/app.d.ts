export interface IUser {
  id: number
  studentId: number
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface User {
      user: IUser
    }

    export interface Request extends User {}
  }

  module 'express' {
    type User = {
      user: IUser
    }
    interface Request extends User {}
  }
}
