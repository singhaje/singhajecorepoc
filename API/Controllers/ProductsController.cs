using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   
    public class ProductsController : BaseApiController
    {

        /// <summary>
        /// Initialize the generic repositories
        /// </summary>
        private readonly IGenericRepository<Product> _prodsRepo;
        private readonly IGenericRepository<ProductBrand> _prodBrandRepo;
        private readonly IGenericRepository<ProductType> _prodTypeRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> prodsRepo, IGenericRepository<ProductBrand> prodBrandRepo,
        IGenericRepository<ProductType> prodTypeRepo, IMapper mapper)
        {
            _mapper = mapper;
            _prodTypeRepo = prodTypeRepo;
            _prodBrandRepo = prodBrandRepo;
            _prodsRepo = prodsRepo;

        }

       [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
            [FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductsWithFiltersForCountSpecification(productParams);

            var totalItems = await _prodsRepo.CountAsync(countSpec);

            var products = await _prodsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex,
                productParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var prod = await _prodsRepo.GetEntityWithSpec(spec);

            if (prod == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Product, ProductToReturnDto>(prod));
        }

        [HttpGet("brands")] // To differentiate from the first one
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var spec = new ProductBrandsSpecification();
            var brands = await _prodBrandRepo.ListAsync(spec);
            return Ok(brands);
        }

        [HttpGet("types")] // To differentiate from the first one
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            var spec = new ProductTypesSpecification();
            var prodTypes = await _prodTypeRepo.ListAsync(spec);
            return Ok(prodTypes);
        }
    }
}