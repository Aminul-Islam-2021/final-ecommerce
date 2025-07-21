import { Link } from 'react-router-dom'

const CategoriesGrid = () => {
  // Sample category data - in a real app, this would come from an API
  const categories = [
    {
      id: 'clothing',
      name: 'Clothing',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1600',
      link: '/products?category=clothing'
    },
    {
      id: 'shoes',
      name: 'Shoes',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1600',
      link: '/products?category=shoes'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600',
      link: '/products?category=accessories'
    },
    {
      id: 'watches',
      name: 'Watches',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600',
      link: '/products?category=watches'
    }
  ]

  return (
    <div className=' px-2 mb-10'>
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(category => (
          <Link key={category.id} to={category.link} className="group">
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" /> */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg md:text-xl font-bold">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoriesGrid