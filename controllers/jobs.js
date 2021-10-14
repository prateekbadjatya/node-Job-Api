const createJob = (req, res) => {
  res.send("create Job");
};

const deleteJob = (req, res) => {
  res.send("Delete Job");
};

const getAllJOb = (req, res) => {
  res.send("get All job");
};

const getJob = (req, res) => {
  res.send("get JOb");
};

const updateJob = (req, res) => {
  res.send("update job");
};

module.exports = {
  createJob,
  deleteJob,
  getAllJOb,
  getJob,
  updateJob
};
