using Core.Entities;

namespace Core.Specifications
{
    public class ProductTypesSpecification : BaseSpecifcation<ProductType>
    {

        public ProductTypesSpecification(int id) : base(x => x.Id == id)        
        {
            
        }
        public ProductTypesSpecification()
        {
            
        }
    }
}