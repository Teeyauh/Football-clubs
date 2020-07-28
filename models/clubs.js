module.exports = (sequelize, DataTypes) => {
  const Clubs = sequelize.define(
    'Clubs',
    {
      Name: DataTypes.STRING,
      Stadium: DataTypes.STRING,
      Capacity: DataTypes.INTEGER,
      Manager: DataTypes.STRING,
      Captain: DataTypes.STRING,
      Location: DataTypes.STRING
    },
    {}
  )

  return Clubs
}
