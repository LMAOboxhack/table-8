export interface ItineraryData {
  itineraryID: number;
  countryID: number;
  userID: number;
  title: string;
}

export interface ItineraryPostData {
  title: string;
  categories: string[];
  complexity: string;
  questionDescription: string;
  linkToQuestion: string;
}
