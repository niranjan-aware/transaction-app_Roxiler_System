export const COLUMNS=[
    {
        Header: 'ID',
        Footer:'ID',
        accessor: 'id'
      },
      {
        Header: 'Title',
        Footer:'Title',
        accessor: 'title'
      },
      {
        Header: 'Description',
        Footer:'Description',
        accessor: 'description'
      },
      {
        Header: 'Price',
        Footer:'Price',
        accessor: 'price'
      },
      {
        Header: 'Category',
        Footer:'Category',
        accessor: 'category'
      },
      {
        Header: 'Sold',
        Footer:'Sold',
        accessor: 'sold',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      
      {
        Header: 'Image',
        Footer: 'Image',
        accessor: 'image',
        Cell: ({ value }) => <img src={value} alt="" style={{ width: '50px', height: '50px',borderRadius:'10px' }} />,
      },
]