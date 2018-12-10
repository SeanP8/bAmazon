
CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT null,
  PRIMARY KEY (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("roomba_vac","appliances", 279.00, 5),("refrigerator","appliances", 39.99, 10),("oven","appliances",288.85, 10),("island", "appliances", 122.32, 2);

insert into products(product_name, department_name, price, stock_quantity)
values ("data_analytic","books", 9.00, 11),("the_model_thinker","books", 15.08, 22),("designing_data","books",20.86, 16),("blockchain_basics", "books", 21.15, 8);

insert into products(product_name, department_name, price, stock_quantity)
values ("iphone","phones", 899.00, 80),("galaxy","phones", 799.99, 30),("pixel","phones",688.95, 40),("lg", "phones", 693.32, 12);