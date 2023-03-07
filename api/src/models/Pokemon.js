const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 20]
      }
    },
    
    image: {
      type: DataTypes.STRING,
    },
    
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: '50',
      validate: {
        min: 0,
        max: 999
      }
    },

    attack: {
      type: DataTypes.INTEGER,
      defaultValue: '50',
      validate: {
        min: 0,
        max: 999
      }
    },

    defense: {
      type: DataTypes.INTEGER,
      defaultValue: '50',
      validate: {
        min: 0,
        max: 999
      }
    },

    speed: {
      type: DataTypes.INTEGER,
      defaultValue: '50',
      validate: {
        min: 0,
        max: 999
      }
    },

    height: {
      type: DataTypes.INTEGER,
      defaultValue: '50',
      validate: {
        min: 0,
        max: 999
      }
    },

    weight: {
      type: DataTypes.INTEGER,
      defaultValue: '50',
      validate: {
        min: 0,
        max: 999
      }
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }

  },
  {
    timestamps: false,
  })
};
