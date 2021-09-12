const contactController = {};

const errMessage = (querier) => {
  return {
    log: `There was an error with the ${querier} query.`,
    message: {
      err: `An error occurred with the ${querier} query.`,
    },
  };
};



module.exports = contactController;