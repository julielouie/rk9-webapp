import { map } from 'p-iteration';
import * as db from '../db/testimonial.db';
import { TestimonialMap } from '../mappers/TestimonialMap';
import { ITestimonial } from '../models/testimonial';

export const getAllTestimonials = async (): Promise<ITestimonial[]> => {
  const allTestimonials = await db.getAllTestimonials();
  return map(allTestimonials, (testimonial) => TestimonialMap.toSimpleDTO(testimonial));
};

export const getTestimonial = async (id: string): Promise<ITestimonial> => {
  const testimonialInfo = await db.getTestimonial(id);
  return TestimonialMap.toDTO(testimonialInfo);
};

export const createTestimonial = async (payload: any): Promise<ITestimonial> => {
  const createdTestimonial = await db.createTestimonial(payload);
  return TestimonialMap.toDTO(createdTestimonial);
};

export const updateTestimonial = async (
  id: string,
  payload: ITestimonial,
): Promise<ITestimonial> => {
  const updatedTestimonial = await db.updateTestimonial(id, payload);
  return TestimonialMap.toDTO(updatedTestimonial);
};

export const deleteTestimonial = async (id: string): Promise<ITestimonial> => {
  const deletedTestimonial = await db.deleteTestimonial(id);
  return TestimonialMap.toDTO(deletedTestimonial);
};
