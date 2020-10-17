module.exports = (sequelize, Sequelize) => {
  const devices = sequelize.define("tc_devices", {

    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
      // allownull : false , 
      // AUTO_INCREMENT: true
    },
    name: {
      type: Sequelize.STRING,
      allownull: false
    },
    uniqueid: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    lastupdate: {
      type: Sequelize.DATE,

    },
    positionid: {
      type: Sequelize.INTEGER,
    },
    groupid: {
      type: Sequelize.INTEGER,
    },
    attributes: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    model: {
      type: Sequelize.INTEGER,
    },
    contact: {
      type: Sequelize.INTEGER,
    },
    category: {
      type: Sequelize.INTEGER,
    },

  });

  return devices;
};