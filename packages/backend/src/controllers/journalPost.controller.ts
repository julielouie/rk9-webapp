import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IJournalPost } from '../models/journalPost';
import * as journalPostService from '../services/journalPost.service';
import { StatusCode } from '../types/common';

export const getAllJournalPosts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const oneOnOneId = req.query.oneOnOne as string;
    const journalPostList: IJournalPost[] = await journalPostService.getAllJournalPosts(oneOnOneId);
    res.status(StatusCode.success).send(journalPostList);
  },
);

export const getJournalPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const journalPost: IJournalPost = await journalPostService.getJournalPost(req.params.id);
  res.status(StatusCode.success).send(journalPost);
});

export const createJournalPost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const createdJournalPost: IJournalPost = await journalPostService.createJournalPost(req.body);
    res.status(StatusCode.success).send(createdJournalPost);
  },
);

export const updateJournalPost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const updatedJournalPost: IJournalPost = await journalPostService.updateJournalPost(
      req.params.id,
      req.body,
    );
    res.status(StatusCode.success).send(updatedJournalPost);
  },
);

export const deleteJournalPost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const deletedJournalPost: IJournalPost = await journalPostService.deleteJournalPost(
      req.params.id,
    );
    res.status(StatusCode.success).send(deletedJournalPost);
  },
);
