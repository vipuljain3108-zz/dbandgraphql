module.exports = (sequelize, Sequelize) => {
    const positions = sequelize.define("tc_positions", {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // allownull : false , 
        AUTO_INCREMENT: true
      },
      protocol: {
        type: Sequelize.STRING
      },
      deviceid: {
        type: Sequelize.STRING,
        allownull : false
      },
      servertime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }, 
      devicetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      fixtime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      valid: {
        type: Sequelize.STRING,
        allownull : false
      },
      latitude: {
        type: Sequelize.FLOAT,
        allownull : false
      },
      longitude: {
        type: Sequelize.FLOAT,
        allownull : false
      }, 
      altitude: {
        type: Sequelize.GEOGRAPHY,
        allownull : false
      },
      speed: {
        type: Sequelize.FLOAT,
        allownull : false
      },
      course: {
        type: Sequelize.FLOAT,
        allownull : false
      },
      address: {
        type: Sequelize.STRING,
       
      },
      attributes: {
        type: Sequelize.STRING,
  
      },
      accuracy: {
        type: Sequelize.FLOAT,
        allownull : false,
        defaultValue: 0
      }, 
      network: {
        type: Sequelize.STRING,
  
      },
    
     
    });
  
    return positions;
  };