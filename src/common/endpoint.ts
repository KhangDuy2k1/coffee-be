enum Endpoint {
     //=========================Auth==============================
     REGISTER = '/register',
     LOGIN = '/login',
     REFRESH_TOKEN = '/refresh', //lấy về refreshToken
     GET_ALLUSER = '/getalluser', //lấy tất cả user (admin)
     UPDATE_USER = '/updateuser/:id', //cập nhật user :id user (admin)
     DELETE_USER = '/deleteuser/:id', // xóa user (id user)
     GET_USER_LOGIN = '/userlogin', // lấy thông tin người dùng đang đăng nhập
     GET_USER_BY_ID = '/userbyid/:id', //lấy user theo id (admin)
     TOTAL_USER = '/totaluser', //lấy tổng số người dùng (admin)
     //===========================================================

     // ======================Coffee==============================
     FIND_COFFEE = '/search', //tìm kiếm cà phê theo tên
     ADD_COFFEE = '/addcoffee', //thêm cà phê (admin)
     DELETE_COFFEE = '/deletecoffee/:id', //xóa cà phê theo id(admin)
     GET_ALL_COFFEE = '/getallcoffee', //lấy tất cả cà phê
     UPDATE_COFFEE = '/updatecoffee/:id', //cập nhật cà phê (admin)
     GET_COFFEE_BY_ID = '/getcoffeebyid/:id', //lấy cà phê theo id
     LIKE_COFFEE = '/likecoffee/:coffee_id', // thích cà phê
     UNLIKE_COFFEE = '/unlikecoffee/:coffee_id', // bỏ thích
     GET_COFFEE_LIKED = '/getcoffeeliked', // lấy danh sách coffee đã like
     //=====================================================================

     //=========================Category===================================
     UPDATE_CATEGORY = '/updatecategory/:category_id',
     ADD_CATEGORY = '/addcategory', //thêm loại cà phê
     DELETE_CATEGORY = '/deletecategory/:category_id',
     GET_ALL_CATEGORY = '/getallcategory',
     //=====================================================================

     //==========================order======================================
     ORDER_COFFEE_DIRECT = '/order', //đặt hàng thanh toán trực tiếp
     PAY_ORDER = '/pay', //loading
     CANCLE_ORDER_DIRECT = '/cancledirect/:id', // hủy đơn hàng thanh toán trực tiếp
     RECEIVED_ORDER = '/received/:id', //đã nhận hàng thành công
     TOTAL_CANCLE = '/totalcancle', // tổng số đơn hàng đã hủy(admin)
     DELETE_ORDER = '/deleteorder/:id', // xóa đơn hàng (admin)
     GET_ALL_ORDER_USER = '/orders', //lấy tất cả đơn hàng của người dùng
     GET_ALL_ORDER = '/allorders', //lấy tất cả đơn hàng (admin)
     TOTAL_ORDER = '/totalorder', //lấy tổng đơn hàng (admin)
     //====================================================================

     //==============================Reviews===============================
     REVIEWS_COFFEE = '/reviews/:id', //đánh giá sản phẩm
     //=====================================================================

     //==============================Wallet=================================
     CREATE_WALLET = '/createwl',
     LOADED_MONEY = '/loadedmoney',
     CANCLE_ORDER_PAY = '/cancle/:id_order', //hủy đơn đã thanh toán, hoàn tiền
     GET_WALLET_USER = '/wallet',
     PAYMENT = '/pay/:id_coffee', //thanh toán và tạo order
     //=====================================================================
}

export default Endpoint;
