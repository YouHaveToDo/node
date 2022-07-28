# SQL 기본 
- 추가 : INSERT INTO 테이블 (컬렁명들) VALUES (값들)
- 조회  
  - SELECT 컬럼 FROM 테이블명
  - WHERE로 조건을 주어 선택 가능
  - OR로 여러가지 조건 중 하나 이상을 만족하는 것을 찾음
  - ORDER BY로 특정 컬럼 값 순서 결정
    1. DESC: 내림차순
    2. ASC: 오름차순
  - LIMIT으로 조회할 개수 제한
  - OFFSET으로 앞의 로우들 스킵 가능
- 수정 : UPDATE 테이블명 SET 컬럼 = 새값 WHERE 조건 
- 삭제 : DELETE FROM 테이블명 WHERE 조건