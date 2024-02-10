export class UserID {
    email: string;
    password: string;
    name: string;
    googleScholarId?: string;
    githubId?: string;
    additionalLinks?: string;
    isProfessor : boolean;

    constructor(email: string, name: string, password: string, isProfessor: boolean, googleScholarId?: string, githubId?: string, additionalLinks?: string) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.googleScholarId = googleScholarId;
        this.githubId = githubId;
        this.additionalLinks = additionalLinks;
        this.isProfessor = isProfessor;
    }
  }