module.exports = (sequelize, DataTypes) => {
  const Clubs = sequelize.define(
    'Clubs',
    {
      name: DataTypes.STRING,
      stadium: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      manager: DataTypes.STRING,
      captain: DataTypes.STRING,
      country: DataTypes.STRING
    },
    {}
  )

  return Clubs
}
