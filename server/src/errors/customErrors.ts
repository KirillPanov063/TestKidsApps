export class CustomError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
  }
}

export const IdeaNotFoundError = (ideaId: number) =>
  new CustomError(`Идея #${ideaId} не найдена`, 404);

export const AlreadyVotedError = () =>
  new CustomError(`Вы уже голосовали за эту идею`, 409);

export const VoteLimitExceededError = () =>
  new CustomError(
    `Лимит голосов превышен (максимум 10 голосов с одного IP)`,
    409
  );
