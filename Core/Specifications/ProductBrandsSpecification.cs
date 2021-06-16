using Core.Entities;

namespace Core.Specifications
{
    public class ProductBrandsSpecification : BaseSpecifcation<ProductBrand>
    {

        public ProductBrandsSpecification(int id) : base(x => x.Id == id)        
        {
            
        }
        public ProductBrandsSpecification()
        {
            
        }
    }
}