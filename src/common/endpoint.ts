enum Endpoint {
     //Auth
     REGISTER = '/register',
     LOGIN = '/login',
     REFRESH_TOKEN = '/refresh',
     GET_ALLUSER = '/getalluser',
     DELETE_USER = '/deleteuser/:id',
     GET_USER_BY_ID = '/userbyid/:id',
     //Coffee
     FIND_COFFEE = '/search',
     ADD_COFFEE = '/addcoffee',
     ADD_CATEGORY = '/addcategory',
     DELETE_COFFEE = '/deletecoffee/:id',
     GET_ALL_COFFEE = '/getallcoffee',
     UPDATE_COFFEE = '/updatecoffee/:id',
     GET_COFFEE_BY_ID = '/getcoffeebyid/:id',
     LIKE_COFFEE = '/likecoffee/:coffee_id',
     UNLIKE_COFFEE = '/unlikecoffee/:coffee_id',
     GET_COFFEE_LIKED = '/getcoffeeliked',
     //Category
     UPDATE_CATEGORY = '/updatecategory/:category_id',
     DELETE_CATEGORY = '/deletecategory/:category_id',
     GET_ALL_CATEGORY = '/getallcategory',
     //order
     ORDER_COFFEE = '/order',
     DELETE_ORDER = '/deleteorder/:id',
     GET_ALL_ORDER = '/orders',
     //discount
     CREATE_DISCOUNT = '/adddiscount',
     GET_ALLDISCOUNT = '/discount',
     DELETE_DISCOUNT = '/deletediscount/:id',
}
export default Endpoint;
