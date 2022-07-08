const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      // 기본적으로 createdAt, updatedAt 컬럼 추가 
      underscored: false,
      //  카멜 케이스에서 스네이크 케이스로 변경하는 옵션
      modelName: 'User',
      //  모델 이름 설정
      tableName: 'users',
      // 데이터 베이스 테이블 이름 설정, 기본적으로 model 이름의 소문자 + 복수로 지정
      paranoid: false,
      // true로 설정시 로우를 지우지 않고 deletedAt컬럼을 만들고 추가.
      charset: 'utf8',
      collate: 'utf8_general_ci',
      // 한글 설정.
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};