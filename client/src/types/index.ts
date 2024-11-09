/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Team {
    teamId: number;
    teamName: string;
    teamCoach: string;
    teamLogo: any; 
  }
export interface Events {
    eventId: number;
    eventName: string;
    eventYear: string;
    eventendDate: any; 
    eventstartDate: any; 
    description:string;
  }
export interface Sports {
    sportsId: number;
    sportsName: string;
    sportsLogo: any;
    description: any; 
  }