import { processAiQuery } from '../services/ai.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const queryAiAssistant = async (req, res, next) => {
  try {
    const { query } = req.body;
    const aiResult = await processAiQuery(query);
    return res.status(200).json(new ApiResponse(200, aiResult, 'AI response generated'));
  } catch (error) {
    next(error);
  }
};
