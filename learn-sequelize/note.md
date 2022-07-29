## 관계 정의하기 

1. 1 : N 관계 (사용자 한 명이 댓글 여러 개 작성)
  - user 입장
    - foreignKey = 남, sourceKey = 나

  - comment 입장
    - foreignKey = 나, targetKey = 남

2. 1 : 1 관계 (사용자 테이블과 사용자 정보 테이블)
  


3. 다대다 관계 (게시글과 해시태그 테이블)
  - DB 특성상 다대다 관계는 중간 테이블이 생김
  - 둘다 belongsToMany

  ## 시퀄라이즈 쿼리 
  1. 조회
  - SELECT * FROM nodejs.users = User.findAll({})

  - SELECT name, married FROM nodejs.users = User.findAll({
      attributes: ['name', 'married']
    })

  - WHERE 조건은 sequelize의 Op 객체를 활용하여 적용.

  2. 생성 
  - User.create({
    ...
  })

  3. 수정
  - User.update({
    comment: '바꿀 내용',
  }, {
    where: { id: 2 },
  }) 

  4. 삭제
  - User.destroy({
    where: { id: 2 }
  })

## 관계 쿼리 
  - include로 JOIN과 비슷한 기능 수행 가능 (관계 있는 것 엮을 수 있음)
    ``` ex
    const user = await User.findOne({
      include: [{
        // user와 comment의 관계가 hasMany이기 때문에 자동으로 comments 복수형으로 설정 //
        model: Comments,
      }]
    })
    console.log(user.Comments) // 사용자 댓글
    ```
  
  - get + 모델명으로 관계 있는 데이터 로딩 가능 
  ```ex
    const user = await User.findOne({})
    const comments = await user.getComments()
    console.log(comments) // 사용자 댓글 
  ```

  - as로 모델명 변경 가능
    1. 관계를 설정 할 때 as로 등록 
        - db.User.hasMany(db.Comment, { foreignKey: 'comment', sourceKey: 'id', as: 'Answers'})

    2. 쿼리할 때 
        ```query 
        const user = await User.findOne({})
        const comments = await user.getAnswer()
        console.log(comments) // 사용자 댓글 
        ```

  - include나 관계 쿼리 메서드에도 where나 attribute 
  ```ex
  const user = await User.findOne({
    include: [{
      model: Comment,
      where: {
        id: 1,
      },
      attributes: ['id']
    }]
  })
  // 또는
  const comments = await user.getComments({
    where: {
      id: 1,
    },
    attributes: ['id'],
  })
  ```

  - 생성 쿼리 
  ```생성 쿼리
   const user = await User.findOne({}) 
   const comment = await Comment.create()
   await user.addComment(comment)
   // 또는
   await user.addDComment(comment.id)
  ```

  - 여러 개를 추가할 때는 배열로 추가 가능 
  ```ex
  const user = await User.findOne({})
  const comment1 = await Comment.create()
  const comment2 = await Comment.create()
  await user.addComment([comment1, comment2])
  ```

  - 수정은 set + 모델명, 삭제는 remove + 모델명

  - 직접 SQL을 쓸 수도 있음
  ```SQL
  const [result, metadata] = await sequelize.query('SELECT * FROM comments')