import { type ItineraryData, type ItineraryPostData } from '../../types/itinerary/itinerary';
import client from '../base';

export default class ItinerarysAPI {
  protected getItinerarysUrl(): string {
    return '/itinerarys';
  }

  public async getItinerarys(): Promise<ItineraryData[]> {
    const response = await client.get(this.getItinerarysUrl());
    const itineraryList = response.data.data as ItineraryData[];
    return itineraryList;
  }

  public async addItinerary(itinerary: ItineraryPostData): Promise<never> {
    return await client.post(this.getItinerarysUrl(), itinerary);
  }

  public async deleteItinerary(itineraryId: number): Promise<void> {
    await client.delete(`${this.getItinerarysUrl()}/${itineraryId}`);
  }

  // get individual itinerary
  public async getItinerary(itineraryId: string): Promise<ItineraryData> {
    const response = await client.get(`${this.getItinerarysUrl()}/${itineraryId}`);
    const itineraryData = response.data.data as ItineraryData;
    return itineraryData;
  }

  // update question
  public async updateItinerary(itineraryId: string, updatedItinerary: Partial<ItineraryPostData>): Promise<ItineraryData> {
    const response = await client.patch(`${this.getItinerarysUrl()}/${itineraryId}`, updatedQuestion);
    const updatedItineraryData = response.data.data as ItineraryData;
    return updatedItineraryData;
  }
}