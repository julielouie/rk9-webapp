import { ITestimonial } from '../models/testimonial';

export class TestimonialMap {
  static toSimpleDTO(testimonial: ITestimonial): ITestimonial {
    return this.toDTO(testimonial);
  }

  static toDTO(testimonial: ITestimonial): ITestimonial {
    return {
      id: testimonial.id,
      title: testimonial.title,
      review: testimonial.review ?? '',
      image: testimonial.image || null,
    };
  }
}
