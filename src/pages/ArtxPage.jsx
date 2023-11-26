import React from 'react';

export default function ArtxPage() {
  return <div>ArtxPage


{/*
주의사항 
css는 테일윈드이다. 
제공된 API를 참고하여 코딩을 해라.






1. 맨 위에 관리자 페이지가 있고 그 아래의 각 페이지는 각각 다른 jsx파일로 작성되며 버튼으로 연결된다. 


포함할 메뉴
- 작가전환관리
(
    상단에 승인처리 미완료(기본으로 오픈됨), 승인처리 종결 메뉴가 있다.
    승인처리 미완료 항목에는 게시판 형식으로 작가전환 요청 글들이 페이지네이션화 되어 한페이지에 10개씩 보인다.
    각 행에는 글제목,작성날짜가 적혀있다.
    게시글 목록 아래에는 페이지네이션 버튼이 있다.
    각각의 게시글을 선택하면 
    글제목,username,본문, 첨부된 이미지가 보이며 맨 아래에 라디오 버튼으로 승인, 미승인 둘 중 하나를 관리자가 선택하게 되어있다.
    미승인이면 하단의 textArea에 미승인 내역을 적어서 같이 보내도록 되어있다.
    그리고 맨 아래에는 승인처리 종결하기 버튼이 있다.
)
- 주문관리
(맨 위에 보여줄 부분 : 2023년 11월 25일(현재 날짜표시, 날짜를 화살표로 이동하여 다른 날 데이터도 볼 수 있다.) 전체 제품 중 주문완료, 주문승인, 배송중, 배송완료 별로 숫자 보여주기(동그라미 안에 숫자가 표현되고 그 아래 상태 이름이 적혀있다.). 일별 판매량을 하단에 그래프로 보여준다.
두번째로 보여줄 부분 : 2023년 11월(현재 월 표시, 월를 화살표로 이동하여 다른 월의 데이터도 볼 수 있다.) 주문 완료 기준으로 총 주문건수, 전년대비 +몇개, -몇개 띄워주기(동그라미 안에 숫자가 표현되고 그 아래 상태 이름이 적혀있다.), 하단에 월별 판매량을 그래프로 보여준다.)
세번째로 보여줄 부분 : 2023년(현재 년도 표시, 연도를 화살표로 이동하여 다른 해의 데이터도 볼 수 있다.)) 주문 완료 기준으로  총 주문건수, 전년대비 +몇개, -몇개 띄워주기(동그라미 안에 숫자가 표현되고 그 아래 상태 이름이 적혀있다.), 연별 판매량을 그래프로 보여준다. 
- 배송관리 
(상단에 기간을 보여준다. 접속할때는 상단에서 항상 오늘 날짜의 월을 표시하며 1일부터 최근 날짜까지의 모든 주문건을 보여준다. 화살표로 기간을 변경할수 있고 검색 버튼을 누르면 해당월을 검색할 수 있도록 한다.APPROVAL
    그리고 아래부분에는 주문번호, 주문일자, 주문상태(주문완료, 주문승인, 배송중, 배송완료 중 하나일것이다), 운송장번호가 등록되었다면 운송장 번호를 보여준다.그리고 운송장번호 오른쪽에 일일이 수정버튼이 달려있다. 또한 운송장번호가 아직 없다면 미등록 이라는 글자가 보인다.
    하단에는 기본적인 페이지네이션이 표시되어있으며 10개씩 보여준다.)
- 회원관리
(맨 위에 보여줄부분 - 2023년 11월 25일(현재날짜)의 가입자 수
동그란 원 안에 숫자가 보이고 그 아래 메뉴이름(신규작가회원수, 신규가입자수)가 보인다.
 권한관리
그아래 보여줄 부분 - 회원 전체목록(5명씩 한페이지로 페이지네이션 처리가 되어있다. 오름차순으로 정렬된다.)이 있고 목록 위에 회원 이름을 검색할수 있는 검색창과 돋보기 모양의 검색버튼이 있다. 전체목록에는 nickname, username, userRole의 내용이 표시된다. 각각의 행에서 useRole 부분을 관리자가 드롭다운으로 변경할수 있으며 드롭다운에서 USER, ARTIST, ADMIN 중 하나를 선택하고 변경사항 저장이라는 버튼이 페이지네이션 아래에 있어서 저장을 누르면 저장과 동시에 화면이 리프레시된다.

)
- 공지사항 관리
(공지사항 목록 게시판, 등록과 삭제 버튼 구현)

    
- api내용
- 파일이름 .jsx
- 세부사항
- 주의사항
1. 답변의 근거와 가정을 설명하세요. 선택한 사항을 설명하고 잠재적인 제한 사항이나 엣지 케이스를 설명하세요
2. css는 테일윈드이다. 
3. 제공된 API를 참고하여 코딩을 해라.
4. 컴포넌트를 좀 더 세분화 하거나 따로 jsx파일로 분리를 하는게 좋은 경우 알려주도록 한다.
5. 각각의 경로는 다음과 같아
 <Route path="/artistmanagement" element={<ArtistManagement/>} />
                    <Route path="/announcementmanagement" element={<AnnouncementManagement />} />
                    <Route path="/ordermanagement" element={<OrderManagement/>} />
                    <Route path="/shippingmanagement" element={<ShippingManagement />} />
                    <Route path="/usermanagement" element={<UserManagement/>} />



api내역
1. 공지사항
종류 : post
경로 : /api/admin/notice
예시응답값:
{
    "request": {
      "title": "string",
      "content": "string"
    }
  }

2. 작가인증요청 받아오기
종류 : GET
경로 : /api/admin/permission-requests/{permissionRequestId}
성공시응답값:
{
    "permissionRequestTitle": "string",
    "permissionRequestContent": "string",
    "permissionRequestFirstImage": "string",
    "permissionRequestSecondImage": "string",
    "permissionRequestStatus": "PROPOSAL",
    "permissionRequestCreatedAt": "2023-11-25T12:40:31.487Z"
  }
3. 작가인증요청 처리
종류 : PATCH
경로 : /api/admin/permission-requests/{permissionRequestId}
파라미터 : 
permissionRequestId,
Status(PROPODAL or APPROVAL or REFUSAL )
성공시응답값:
{
    "updatedAt": "2023-11-25T12:42:29.669Z"
}

4.모든유저조회
종류 : GET
경로 : /api/admin/users
Pagerble파라미터 : 
{
    "page": 0,
    "size": 1,
    "sort": [
      "string"
    ]
  }
반환값:
curl: -X 'GET' \
  'http://ka8d596e67406a.user-app.krampoline.com/api/admin/users?page=0&size=1&sort=string' \
  -H 'accept: 
  
  
Request URL : http://ka8d596e67406a.user-app.krampoline.com/api/admin/users?page=0&size=1&sort=string


5. 전체 배송 조회
종류 : GET
경로 : /api/admin/statistics/orders
Pagerble파라미터 : 
{
    "orderSuccessCounts": 0,
    "orderApprovalCounts": 0,
    "deliveryInProgressCounts": 0,
    "deliveryCompletedCounts": 0
  }
  반환값:
  curl -X 'GET' \
  'http://ka8d596e67406a.user-app.krampoline.com/api/admin/statistics/orders' \
  // -H 'accept: *'
  Request URL : http://ka8d596e67406a.user-app.krampoline.com/api/admin/statistics/orders

  
6.배송 연별 조회
종류 : GET
경로 : /api/admin/statistics/orders/yearly-order-count
반환값:
{
    "totalOrderCounts": 0,
    "increaseCounts": 0
  }
7. 배송 월별 조회
종류 : GET
경로 : /api/admin/statistics/orders/monthly-order-count
반환값:
{
    "totalOrderCounts": 0,
    "increaseCounts": 0
  }
8. 배송 일별 조회
종류 : GET
경로 : /api/admin/statistics/orders/daily-user-count
반환값:
{
    "newUserCounts": 0,
    "newArtistCounts": 0
  }
    
9.작가 승인 관리 현황
종류 : GET
경로 : /api/admin/permission-requests
파라미터 : 
Status(PROPODAL or APPROVAL or REFUSAL )
Pagerble파라미터 : 
{
    "page": 0,
    "size": 1,
    "sort": [
      "string"
    ]
  }
반환값:
{
    "totalElements": 0,
    "totalPages": 0,
    "size": 0,
    "content": [
      {
        "permissionRequestLink": "string",
        "permissionRequestTitle": "string",
        "permissionRequestContent": "string",
        "permissionRequestStatus": "PROPOSAL",
        "permissionRequestCreatedAt": "2023-11-25T12:52:14.051Z"
      }
    ],
    "number": 0,
    "sort": {
      "empty": true,
      "unsorted": true,
      "sorted": true
    },
    "numberOfElements": 0,
    "pageable": {
      "offset": 0,
      "sort": {
        "empty": true,
        "unsorted": true,
        "sorted": true
      },
      "paged": true,
      "unpaged": true,
      "pageNumber": 0,
      "pageSize": 0
    },
    "first": true,
    "last": true,
    "empty": true
  }


  공지사항 (Notice Posting)

Type: POST
Path: /api/admin/notice
Example Response: { "request": { "title": "string", "content": "string" } }
작가인증요청 받아오기 (Fetch Artist Permission Request)

Type: GET
Path: /api/admin/permission-requests/{permissionRequestId}
Success Response: Includes details like title, content, images, status, and creation date.
작가인증요청 처리 (Handle Artist Permission Request)

Type: PATCH
Path: /api/admin/permission-requests/{permissionRequestId}
Parameters: permissionRequestId, Status (PROPOSAL, APPROVAL, REFUSAL)
Success Response: { "updatedAt": "2023-11-25T12:42:29.669Z" }
모든유저조회 (View All Users)

Type: GET
Path: /api/admin/users
Parameters: Pagination details (page, size, sort)
전체 배송 조회 (View All Orders)

Type: GET
Path: /api/admin/statistics/orders
Parameters: Pagination details
배송 연별 조회 (Yearly Order Statistics)

Type: GET
Path: /api/admin/statistics/orders/yearly-order-count
배송 월별 조회 (Monthly Order Statistics)

Type: GET
Path: /api/admin/statistics/orders/monthly-order-count
배송 일별 조회 (Daily Order Statistics)

Type: GET
Path: /api/admin/statistics/orders/daily-user-count
작가 승인 관리 현황 (Artist Approval Management Status)

Type: GET
Path: /api/admin/permission-requests
Parameters: Status (PROPOSAL, APPROVAL, REFUSAL) and Pagination details




자 이제 부터 다섯가지 버튼으로 이동되는 각각의 페이지를 작성할거야.
하지만 그전에 주의할점이 있어.
나는 초보 프로그래머고 너는 선임 프로그래머라고 가정을 해볼게. 아래 사항을 참고해서 나에게 코드에 대한 설명을 덧붙여주고 잘 이해할수 있도록 설명해줘.

1. 답변의 근거와 가정을 설명하세요. 선택한 사항을 설명하고 잠재적인 제한 사항이나 엣지 케이스를 설명하세요
2. css는 테일윈드이다. 
3. 제공된 API를 참고하여 코딩을 해라.
4. 컴포넌트를 좀 더 세분화 하거나 따로 jsx파일로 분리를 하는게 좋은 경우 알려주도록 한다.
5. 각각의 경로는 다음과 같아
 <Route path="/artistmanagement" element={<ArtistManagement/>} />
                    <Route path="/announcementmanagement" element={<AnnouncementManagement />} />
                    <Route path="/ordermanagement" element={<OrderManagement/>} />
                    <Route path="/shippingmanagement" element={<ShippingManagement />} />
                    <Route path="/usermanagement" element={<UserManagement/>} />

자 이제 첫번째 버튼으로 연결되는 작가전환관리 페이지(ArtistManagement)를 만들거야.

세부사항은 다음과 같아
- 작가전환관리
(
    상단에 승인처리 미완료(기본으로 오픈됨), 승인처리 종결 메뉴가 있다.
    승인처리 미완료 항목에는 게시판 형식으로 작가전환 요청 글들이 페이지네이션화 되어 한페이지에 10개씩 보인다.
    각 행에는 글제목,작성날짜가 적혀있다.
    게시글 목록 아래에는 페이지네이션 버튼이 있다.
    각각의 게시글을 선택하면 
    글제목,username,본문, 첨부된 이미지가 보이며 맨 아래에 라디오 버튼으로 승인, 미승인 둘 중 하나를 관리자가 선택하게 되어있다.
    미승인이면 하단의 textArea에 미승인 내역을 적어서 같이 보내도록 되어있다.
    그리고 맨 아래에는 승인처리 종결하기 버튼이 있다.
)

위 내용을 반영해서 기존 스타일을 가진 코드를 나에게 작성해줄래?






userAddress
: 
""
userAddressDetail
: 
""
userCreatedAt
: 
"2023-11-24T20:09:00"
userEmail
: 
"user5@gmail.com"
userId
: 
"dea4c07e-8ab9-11ee-a564-5aa75424522e"
userIntroduction
: 
"유저 5호입니다."
userNickname
: 
"nuser5"
userPhoneNumber
: 
"010-1234-5678"
userProfileImage
: 
null
username
: 
"user5"

*/
 




}



</div>;
}