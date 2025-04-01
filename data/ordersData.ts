// ordersData.ts
export type OrderStatus = 'Shipping' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Unpaid';

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productColor: string;
  productImage: string;
  customer: string;
  price: number;
  date: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
}

export const ordersData: Order[] = [
  {
    id: '001',
    productId: '021231',
    productName: 'Kanky Kitadakate',
    productColor: 'Green',
    productImage: '/nexImage.png',
    customer: 'Leslie Alexander',
    price: 21.78,
    date: '04/17/23',
    paymentStatus: 'Unpaid',
    orderStatus: 'Cancelled'
  },
  {
    id: '002',
    productId: '021231',
    productName: 'Story Honzo',
    productColor: 'Cream',
    productImage: '/nexImage.png',
    customer: 'Jenny Wilson',
    price: 21.78,
    date: '04/17/23',
    paymentStatus: 'Paid',
    orderStatus: 'Shipping'
  },
  {
    id: '003',
    productId: '021231',
    productName: 'Story Honzo',
    productColor: 'Cream',
    productImage: '/nexImage.png',
    customer: 'Esther Howard',
    price: 21.78,
    date: '04/17/23',
    paymentStatus: 'Paid',
    orderStatus: 'Shipping'
  },
  {
    id: '004',
    productId: '021371',
    productName: 'Kanky Kitadakate',
    productColor: 'Green',
    productImage: '/nexImage.png',
    customer: 'Robert Fox',
    price: 21.78,
    date: '04/17/23',
    paymentStatus: 'Unpaid',
    orderStatus: 'Cancelled'
  },
  {
    id: '005',
    productId: '021231',
    productName: 'Story Honzo',
    productColor: 'Black',
    productImage: '/nexImage.png',
    customer: 'Jacob Jones',
    price: 21.78,
    date: '04/17/23',
    paymentStatus: 'Paid',
    orderStatus: 'Shipping'
  },
  {
    id: '006',
    productId: '021231',
    productName: 'Kanky Kitadakate',
    productColor: 'Green',
    productImage: '/nexImage.png',
    customer: 'Leslie Alexander',
    price: 21.78,
    date: '04/17/23',
    paymentStatus: 'Unpaid',
    orderStatus: 'Cancelled'
  },
  {
    id: '007',
    productId: '021231',
    productName: 'Story Honzo',
    productColor: 'Black',
    productImage: '/nexImage.png',
    customer: 'Jacob Jones',
    price: 21.78,
    date: '04/17/23',
    paymentStatus: 'Paid',
    orderStatus: 'Shipping'
  },
  {
    id: '008',
    productId: '021231',
    productName: 'Story Honzo',
    productColor: 'Cream',
    productImage: '/nexImage.png',
    customer: 'Esther Howard',
    price: 21.78,
    date: '04/17/23',
    paymentStatus: 'Paid',
    orderStatus: 'Shipping'
  },
  {
    id: '009',
    productId: '021232',
    productName: 'Kanky Kitadakate',
    productColor: 'Blue',
    productImage: '/nexImage.png',
    customer: 'John Smith',
    price: 21.78,
    date: '04/18/23',
    paymentStatus: 'Paid',
    orderStatus: 'Completed'
  },
  {
    id: '010',
    productId: '021233',
    productName: 'Story Honzo',
    productColor: 'White',
    productImage: '/nexImage.png',
    customer: 'Emma Johnson',
    price: 21.78,
    date: '04/18/23',
    paymentStatus: 'Paid',
    orderStatus: 'Completed'
  },
  {
    id: '011',
    productId: '021234',
    productName: 'Kanky Kitadakate',
    productColor: 'Red',
    productImage: '/nexImage.png',
    customer: 'Michael Brown',
    price: 21.78,
    date: '04/19/23',
    paymentStatus: 'Unpaid',
    orderStatus: 'Cancelled'
  },
  {
    id: '012',
    productId: '021235',
    productName: 'Story Honzo',
    productColor: 'Grey',
    productImage: '/nexImage.png',
    customer: 'Olivia Davis',
    price: 21.78,
    date: '04/19/23',
    paymentStatus: 'Paid',
    orderStatus: 'Completed'
  },
  {
    id: '013',
    productId: '021236',
    productName: 'Kanky Kitadakate',
    productColor: 'Yellow',
    productImage: '/nexImage.png',
    customer: 'William Wilson',
    price: 21.78,
    date: '04/20/23',
    paymentStatus: 'Unpaid',
    orderStatus: 'Cancelled'
  },
  {
    id: '014',
    productId: '021237',
    productName: 'Story Honzo',
    productColor: 'Purple',
    productImage: '/nexImage.png',
    customer: 'Sophia Taylor',
    price: 21.78,
    date: '04/20/23',
    paymentStatus: 'Paid',
    orderStatus: 'Shipping'
  },
  {
    id: '015',
    productId: '021238',
    productName: 'Kanky Kitadakate',
    productColor: 'Orange',
    productImage: '/nexImage.png',
    customer: 'James Anderson',
    price: 21.78,
    date: '04/21/23',
    paymentStatus: 'Paid',
    orderStatus: 'Completed'
  },
  {
    id: '016',
    productId: '021239',
    productName: 'Story Honzo',
    productColor: 'Pink',
    productImage: '/nexImage.png',
    customer: 'Ava Martinez',
    price: 21.78,
    date: '04/21/23',
    paymentStatus: 'Paid',
    orderStatus: 'Shipping'
  },
  {
    id: '017',
    productId: '021240',
    productName: 'Kanky Kitadakate',
    productColor: 'Teal',
    productImage: '/nexImage.png',
    customer: 'Benjamin Thompson',
    price: 21.78,
    date: '04/22/23',
    paymentStatus: 'Unpaid',
    orderStatus: 'Cancelled'
  },
  {
    id: '018',
    productId: '021241',
    productName: 'Story Honzo',
    productColor: 'Navy',
    productImage: '/nexImage.png',
    customer: 'Charlotte Garcia',
    price: 21.78,
    date: '04/22/23',
    paymentStatus: 'Paid',
    orderStatus: 'Completed'
  },
  {
    id: '019',
    productId: '021242',
    productName: 'Kanky Kitadakate',
    productColor: 'Maroon',
    productImage: '/nexImage.png',
    customer: 'Daniel White',
    price: 21.78,
    date: '04/23/23',
    paymentStatus: 'Paid',
    orderStatus: 'Shipping'
  },
  {
    id: '020',
    productId: '021243',
    productName: 'Story Honzo',
    productColor: 'Olive',
    productImage: '/nexImage.png',
    customer: 'Isabella Thomas',
    price: 21.78,
    date: '04/23/23',
    paymentStatus: 'Paid',
    orderStatus: 'Completed'
  }
];