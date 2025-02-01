import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  // Create districts
  const dibrugarhDistrict = await prisma.district.create({
    data: {
      name: 'Dibrugarh',
      schools: {
        create: [
          {
            name: 'Dibrugarh High School',
            uniforms: {
              create: [
                {
                  name: 'White Shirt',
                  slug: 'dibrugarh-white-shirt',
                  image: '/uniforms/dibrugarh-white-shirt.png',
                  price: '₹300',
                  mrp: '₹350',
                  rating: 4.6,
                  discount: '14%',
                  uniformSizes: {
                    create: [
                      { size: 'M', price: '₹300', stock: 80 },
                      { size: 'L', price: '₹300', stock: 60 },
                    ],
                  },
                },
                {
                  name: 'Blue Skirt for Girls',
                  slug: 'dibrugarh-blue-skirt',
                  image: '/uniforms/dibrugarh-blue-skirt.png',
                  price: '₹350',
                  mrp: '₹400',
                  rating: 4.7,
                  discount: '12%',
                  uniformSizes: {
                    create: [
                      { size: 'M', price: '₹350', stock: 90 },
                      { size: 'L', price: '₹350', stock: 70 },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const jorhatDistrict = await prisma.district.create({
    data: {
      name: 'Jorhat',
      schools: {
        create: [
          {
            name: 'Jorhat Valley School',
            uniforms: {
              create: [
                {
                  name: 'Half Sleeve White Shirt',
                  slug: 'jorhat-half-sleeve-shirt',
                  image: '/uniforms/jorhat-half-sleeve-shirt.png',
                  price: '₹280',
                  mrp: '₹320',
                  rating: 4.4,
                  discount: '12%',
                  uniformSizes: {
                    create: [
                      { size: 'M', price: '₹280', stock: 100 },
                      { size: 'L', price: '₹280', stock: 50 },
                    ],
                  },
                },
                {
                  name: 'Grey Pants',
                  slug: 'jorhat-grey-pants',
                  image: '/uniforms/jorhat-grey-pants.png',
                  price: '₹450',
                  mrp: '₹500',
                  rating: 4.5,
                  discount: '10%',
                  uniformSizes: {
                    create: [
                      { size: 'M', price: '₹450', stock: 110 },
                      { size: 'L', price: '₹450', stock: 80 },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`Created districts and schools for ${dibrugarhDistrict.name} and ${jorhatDistrict.name}`);
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
