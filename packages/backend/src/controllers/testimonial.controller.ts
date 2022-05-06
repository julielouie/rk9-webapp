import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ITestimonial } from '../models/testimonial';
import * as testimonialService from '../services/testimonial.service';
import { StatusCode } from '../types/common';

export const getAllTestimonials = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const testimonialsList: ITestimonial[] = await testimonialService.getAllTestimonials();
    res.status(StatusCode.success).send(testimonialsList);
  },
);

export const getTestimonial = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const testimonial: ITestimonial = await testimonialService.getTestimonial(req.params.id);
  res.status(StatusCode.success).send(testimonial);
});

export const createTestimonial = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const createdTestimonial: ITestimonial = await testimonialService.createTestimonial(req.body);
    res.status(StatusCode.success).send(createdTestimonial);
  },
);

export const updateTestimonial = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const updatedTestimonial: ITestimonial = await testimonialService.updateTestimonial(
      req.params.id,
      req.body,
    );
    res.status(StatusCode.success).send(updatedTestimonial);
  },
);

export const deleteTestimonial = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const deletedTestimonial: ITestimonial = await testimonialService.deleteTestimonial(
      req.params.id,
    );
    res.status(StatusCode.success).send(deletedTestimonial);
  },
);
