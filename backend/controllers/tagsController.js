const TasksRepository = require("../dataAccess/tasksDataAccess");
const jwt = require("jsonwebtoken");

class TagsController {
  static async createTag(req, res, next) {
    const token = req.headers["authorization"];
    const tag = req.params.tag;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const newTag = await TasksRepository.createTag(tag, userId);
      console.log(newTag);
      res.status(201).json({
        status: "success",
        data: newTag,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTag(req, res, next) {
    const token = req.headers["authorization"];
    const tagId = req.params.tagId;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      const tag = await TasksRepository.deleteTag(tagId);
      res.status(200).json({
        status: "success",
        data: tag,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTags(req, res, next) {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const tags = await TasksRepository.getUserTags(userId);
      res.status(200).json({
        status: "success",
        data: tags,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getTagsByTaskId(req, res, next) {
    const token = req.headers["authorization"];
    const taskId = req.params.taskId;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      const tags = await TasksRepository.getTagsByTaskId(taskId);
      res.status(200).json({
        status: "success",
        data: tags,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTasksByTagId(req, res, next) {
    const token = req.headers["authorization"];
    const tagId = req.params.tagId;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      const tags = await TasksRepository.getTasksByTagId(tagId);
      res.status(200).json({
        status: "success",
        data: tags,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addTagToTask(req, res, next) {
    const token = req.headers["authorization"];
    const { taskId, tagId } = req.params;
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      const tag = await TasksRepository.addTagToTask(taskId, tagId);
      res.status(200).json({
        status: "success",
        data: tag,
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeTagFromTask(req, res, next) {
    const { taskId, tagId } = req.params;
    const token = req.headers["authorization"];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      const tag = await TasksRepository.removeTagFromTask(taskId, tagId);
      res.status(200).json({
        status: "success",
        data: tag,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TagsController;
