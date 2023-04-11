# 📜 저렴다방

**React.js**의 공부한 것들을 녹여내기위한 PassOrder 프로젝트 입니다.
<br>
<a href="https://gorhf9397.github.io/pass-order/">배포 URL</a>입니다.
<br>
<a href="https://good-elephant-241.notion.site/caf552c96b11425eb314fadddb419b6a">기획 및 프로젝트에 목표</a>입니다.

## 🗞️ 개요

- **로그인**<br>
  firebase Authentication Sign-in method 의 기능을 사용해<br>
  E-mail,Password 회원가입 기능과 google,facebook 소셜로그인 을 통해<br>
  로그인 기능을 구현 했습니다.
- **Firbase**<br>
  Firebase Realtime Database 기능을 통해 상품과 스토어에 JSON API 를 생성하고<br>
  FireStore DataBase 기능으로 각 매장별로 주문목록,스탬프&쿠폰,판매자,구매자,장바구니<br>
  에 데이터를 관리해주고 있습니다.
- **디자인**<br>
  Sass를 사용하여 변수선언과 중첩을 사용해 스타일을 좀더 쉽게 시도했습니다.
- **상태관리**<br>
  프로젝트에서 관리되는 데이터가 많지 않다고 판단돼 상태 관리 라이브러리는 따로 사용하지 않고<br>
  필수적으로 관리해 줘야 할 데이터만 전역 상태로 분리해 최상위 컴포넌트에서 하위 컴포넌트로 전달해 주었습니다.<br>

## 🔧 사용 기술

### Front-end - <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/><br>

### Back-end - <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/><br>

### Library - <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=black"/><img src="https://img.shields.io/badge/fontawesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=black"/><img src="https://img.shields.io/badge/slick-FF880F?style=for-the-badge&logo=slick&logoColor=black"/><img src="https://img.shields.io/badge/githubpages-222222?style=for-the-badge&logo=githubpages&logoColor=white"/><br>

## 📌 구동화면

### 1. 로그인

- 로딩화면이 뜬 후 로그인 페이지로 이동합니다.
- 로그인 했을경우 메인 홈 화면으로 연결됩니다.
- 로그인 안했을 경우, 로그인 화면으로 연결됩니다.
- 홈화면 에서는 기본적인 메뉴들은 사이드바를 구현했습니다.

|                                                           **로그인 전**                                                           |                                                       **로그인 후 홈화면**                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/108771927/230897260-ca345881-02f3-4243-8890-d5ef1dc9aa02.jpg" width="280px"/> | <img src="https://user-images.githubusercontent.com/108771927/230902363-1326a7f3-d1ea-4b96-a200-2f86cfa98249.gif" width="280px"/> |

### 2-1. 지역선택

- 홈화면에서 주문을 클릭하면 지역선택으로 연결됩니다.
- 클릭하면 해당 매장이 맞는지 확인후 메뉴페이지로 연결됩니다.

|                                                           **지역선택**                                                            |                                                             **클릭**                                                              |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/108771927/230899912-68d7ef6a-927b-425a-a4cc-f740e479795c.jpg" width="280px"/> | <img src="https://user-images.githubusercontent.com/108771927/230899915-5441e99c-4d46-4231-9a20-3e0a5d9da310.jpg" width="280px"/> |

### 2-2. 메뉴선택

- 지역을 누르면 메뉴페이지로 오면서 해당 지역이 상단에 표기됩니다.
- 메뉴는 핫,아이스 메뉴가 있으며 메뉴를 클릭할시 메뉴에 세부정보가 표시됩니다.

|                                                            **핫메뉴**                                                             |                                                          **아이스메뉴**                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/108771927/230900669-daa94b96-0c17-4f7a-a210-6c0c54f7199c.jpg" width="280px"/> | <img src="https://user-images.githubusercontent.com/108771927/230900673-bbe7f618-11ff-4ffc-a4de-858a94644cca.jpg" width="280px"/> |

### 2-3. 메뉴디테일

- 메뉴디테일로 이동하면 커피에 사이즈와 수량을 선택한뒤 바로결제 또는 장바구니에 추가할수있습니다.
- 장바구니가 비어있다면 장바구니가 비어있다고 표시되고 알림창이 호출됩니다.

|                                                          **메뉴디테일**                                                           |                                                          **빈 장바구니**                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/108771927/230901562-e6779ad6-d2fd-49c3-bb96-f4477ed038c4.gif" width="280px"/> | <img src="https://user-images.githubusercontent.com/108771927/230901771-02f76a84-c854-4af6-b8f3-085fe5af3c7c.jpg" width="280px"/> |

### 2-4. 결제하기

- 결제페이지에서 선택한 상품에 정보를 보여줍니다.
- 요청사항을 입력하고 쿠폰이 있다면 쿠폰이 표시가되고 없다면 쿠폰이 없다는 문구를 보여줍니다.
- 결제수단을 선택해주고 적립예정스탬프와 할인된 총가격을 보여주고 최종확인후 결제가 진행됩니다.

|                                                   **메뉴디테일**                                                    |                                                   **빈 장바구니**                                                   |                                                    **결제하기**                                                     |                                                    **결제알림**                                                     |
| :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/108771927/230903086-36130d2c-0df5-413d-8c66-ec6b50d93d56.jpg"/> | <img src="https://user-images.githubusercontent.com/108771927/230903083-31d09180-e8f1-49df-8321-5470b8bc79a5.jpg"/> | <img src="https://user-images.githubusercontent.com/108771927/230903081-61f55d75-627d-4597-80a4-6b51df71eaeb.jpg"/> | <img src="https://user-images.githubusercontent.com/108771927/230903363-38c427bc-67af-4c09-a5ec-4cef83ae1f7d.jpg"/> |

### 2-5. 주문내역

- 결제된 데이터를 받아와 유저에게 보여줍니다.
- 수령시간은 기본값이 "준비완료 후 수령 가능" 이고 가맹판매자페이지에서 변경할 수 있습니다.
- 실시간통신을 통해 화면이 rerender가 발생하지않아도 실시간으로 바뀝니다.

|                                                        **픽업전 주문내역**                                                        |                                                          **빈 장바구니**                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/108771927/230908913-c2159bca-f619-44b7-ae65-d3c0b96a1087.jpg" width="280px"/> | <img src="https://user-images.githubusercontent.com/108771927/230908917-acfe3809-afa7-4903-be12-9d373d050218.jpg" width="280px"/> |

### 3. 스탬프 & 쿠폰

- 홈화면에 스탬프와 쿠폰이 몇갠지 표기되어 유저가 정보를 좀더 쉽게 파악할 수 있게 했습니다.
- 적립내역을 구현해 언제 어디서 스탬프가 적립됐는지 알수있도록 표기했습니다.
- 마이페이지를 통해 좀더 많은 정보를 보여줬습니다.

|                                                           **적립내역**                                                            |                                                            **홈 표기**                                                            |                                                          **마이페이지**                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/108771927/230909875-ebe5ce40-835b-4d8e-ad34-ab663e204c6e.jpg" width="280px"/> | <img src="https://user-images.githubusercontent.com/108771927/230909879-ce1b4caa-05ab-4cd5-b28c-5d281a9d6e54.jpg" width="280px"/> | <img src="https://user-images.githubusercontent.com/108771927/230909881-da7be138-765b-4640-813a-0160ccb9c7bc.jpg" width="280px"/> |

### 4. 가맹페이지

- 가맹점페이지를 업체에 맞게 따로 구현하여 현재 들어온 주문을 종합적으로 볼 수 있습니다.
- 페이지에서 픽업여부를 선택할 수 있고 선택한 데이터는 실시간통신을 통해 유저에 주문내역에 반영됩니다.
- 유저가 어떤 주문을 했는지 주문상세를 통해 확인할 수 있습니다.

| **판매자페이지** | <img src="https://user-images.githubusercontent.com/108771927/230910746-9d0f8a9a-e377-4454-821d-af2ff852150a.png"/> |
| :--------------: | ------------------------------------------------------------------------------------------------------------------: |

| **픽업변경** | <img src="https://user-images.githubusercontent.com/108771927/230910748-c08f11f7-bed1-4d6d-9260-8b84d6dde580.png"/> |
| :----------: | ------------------------------------------------------------------------------------------------------------------: |

| **상세보기** | <img src="https://user-images.githubusercontent.com/108771927/230910751-0f1de172-986c-40c2-8b0a-7125214ff5f9.JPG"/> |
| :----------: | ------------------------------------------------------------------------------------------------------------------: |

### 5. 404페이지

- 유효하지않은 페이지를 검색할시 출력되는 페이지 입니다.

|                                                          **에러페이지**                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/108771927/230912574-0cc5f3d7-6f2c-479d-9b4c-b6768d1f9695.jpg" width="280px"/> |

## 🔎 개발일정

- 기간: 2023.02.20 ~ 2023.04.06 <br>

  - 프로젝트 구상
  - 요구사항분석
  - reference 조사
  - 구현 순서 결정

- 폴더트리

```
pass-order
├─ .git
├─ .gitignore
├─ .vscode
│  └─ extensions.json
├─ jsconfig.json
├─ package.json
├─ public
│  └─ index.html
├─ README.md
└─ src
   ├─ assets
   │  ├─ coffee.png
   │  ├─ giphy.gif
   │  ├─ homeLogo.png
   │  ├─ img
   │  │  ├─ mainImg1.jpg
   │  │  ├─ mainImg2.jpg
   │  │  ├─ mainImg3.jpg
   │  │  └─ mainImg4.jpg
   │  ├─ logo.png
   │  └─ order
   │     └─ kakaopay.jpg
   ├─ components
   │  ├─ App.jsx
   │  ├─ Error
   │  │  └─ NotFound.jsx
   │  ├─ Home
   │  │  └─ Home.jsx
   │  ├─ Login
   │  │  ├─ LoginHome.jsx
   │  │  ├─ PwdSerch.jsx
   │  │  ├─ SignIn.jsx
   │  │  └─ SignUp.jsx
   │  ├─ Order
   │  │  ├─ Basket.jsx
   │  │  ├─ Menu.jsx
   │  │  ├─ MenuDetail.jsx
   │  │  ├─ OrderList.jsx
   │  │  ├─ OrderPlaces.jsx
   │  │  └─ Payment.jsx
   │  ├─ Router.jsx
   │  ├─ Seller
   │  │  ├─ Seller.jsx
   │  │  └─ SellerSidebar.jsx
   │  └─ Sidebar
   │     ├─ Location.jsx
   │     ├─ MenuInform.jsx
   │     ├─ MyInformation.jsx
   │     ├─ OrderHistory.jsx
   │     ├─ OrderItem.jsx
   │     └─ Sidebar.jsx
   ├─ container
   ├─ db
   │  ├─ localhost.webarchive
   │  └─ passorder-db.json
   ├─ fbase.js
   ├─ index.js
   └─ scss
      ├─ Error
      │  └─ Error.scss
      ├─ Home
      │  └─ Home.scss
      ├─ Login
      │  ├─ LoginContainer.scss
      │  └─ SignUp.scss
      ├─ normalize.scss
      ├─ Order
      │  ├─ Basket.scss
      │  ├─ Menu.scss
      │  ├─ OrderList.scss
      │  └─ Payment.scss
      ├─ reset.scss
      ├─ Seller
      │  └─ Seller.scss
      └─ Sidebar
         ├─ Location.scss
         ├─ MyInformation.scss
         └─ OrderHistory.scss

```
