'use strict';

/********************************************************************************************
 *                                                                                          *
 * The goal of the task is to get basic knowledge of SQL functions and                      *
 * approaches to work with data in SQL.                                                     *
 * https://dev.mysql.com/doc/refman/5.7/en/function-reference.html                          *
 *                                                                                          *
 * The course do not includes basic syntax explanations. If you see the SQL first time,     *
 * you can find explanation and some trainings at W3S                                       *
 * https://www.w3schools.com/sql/sql_syntax.asp                                             *
 *                                                                                          *
 ********************************************************************************************/


/**
 *  Create a SQL query to return next data ordered by city and then by name:
 * | Employy Id | Employee Full Name | Title | City |
 *
 * @return {array}
 *
 */
async function task_1_1(db) {
    // The first task is example, please follow the style in the next functions.
    let result = await db.query(`
        SELECT
           EmployeeID as "Employee Id",
           CONCAT(FirstName, ' ', LastName) AS "Employee Full Name",
           Title as "Title",
           City as "City"
        FROM Employees
        ORDER BY City, "Employee Full Name"
    `);
    return result[0];
}

/**
 *  Create a query to return an Order list ordered by order id descending:
 * | Order Id | Order Total Price | Total Order Discount, % |
 *
 * NOTES: Discount in OrderDetails is a discount($) per Unit.
 * @return {array}
 *
 */
async function task_1_2(db) {
    let result = await db.query(`
        SELECT 
            OrderID as 'Order Id',
            sum(UnitPrice*Quantity) as 'Order Total Price',
            ROUND(sum(Quantity*Discount)*100/sum(UnitPrice*Quantity) ,3) as 'Total Order Discount, %'
        FROM OrderDetails
        GROUP BY OrderID
        ORDER BY OrderID desc;
    `);
    return result[0];
}

/**
 *  Create a query to return all customers from USA without Fax:
 * | CustomerId | CompanyName |
 *
 * @return {array}
 *
 */
async function task_1_3(db) {
    let result = await db.query(`
        SELECT
            CustomerId,
            CompanyName
            FROM Customers
        WHERE Country='USA' && isnull(Fax);
    `);
    return result[0];
}

/**
 * Create a query to return:
 * | Customer Id | Total number of Orders | % of all orders |
 *
 * order data by % - higher percent at the top, then by CustomerID asc
 *
 * @return {array}
 *
 */
async function task_1_4(db) {
    let result = await db.query(`
        SELECT 
            c.CustomerID as 'Customer Id',
            COUNT(*) as 'Total number of Orders',
            ROUND(COUNT(*)*100/(SELECT COUNT(*) FROM Orders), 5) as '% of all orders'
        FROM Customers c
        INNER JOIN Orders o
        ON c.CustomerID=o.CustomerID
        GROUP BY o.CustomerID
        ORDER BY \`% of all orders\` DESC, o.CustomerID;
    `);
    return result[0];
}

/**
 * Return all products where product name starts with 'A', 'B', .... 'F' ordered by name.
 * | ProductId | ProductName | QuantityPerUnit |
 *
 * @return {array}
 *
 */
async function task_1_5(db) {
    let result = await db.query(`
        SELECT 
            ProductId,
            ProductName,
            QuantityPerUnit
        FROM Products
        WHERE ProductName RLIKE '^[A-F]'
        ORDER BY ProductName;
    `);
    return result[0];
}

/**
 *
 * Create a query to return all products with category and supplier company names:
 * | ProductName | CategoryName | SupplierCompanyName |
 *
 * Order by ProductName then by SupplierCompanyName
 * @return {array}
 *
 */
async function task_1_6(db) {
    let result = await db.query(`
        SELECT 
            ProductName,
            CategoryName,
            CompanyName as 'SupplierCompanyName'
        FROM Products p
        LEFT JOIN Categories c ON p.CategoryID=c.CategoryID
        LEFT JOIN Suppliers s ON s.SupplierID=p.SupplierID
        ORDER BY ProductName, CompanyName;
    `);
    return result[0];
}

/**
 *
 * Create a query to return all employees and full name of person to whom this employee reports to:
 * | EmployeeId | FullName | ReportsTo |
 *
 * Full Name - title of courtesy with full name.
 * Order data by EmployeeId.
 * Reports To - Full name. If the employee does not report to anybody leave "-" in the column.
 * @return {array}
 *
 */
async function task_1_7(db) {
    let result = await db.query(`
        SELECT 
            emp.EmployeeId,
            CONCAT(emp.FirstName, ' ', emp.LastName) as FullName,
            IFNULL(CONCAT(e.FirstName, ' ', e.LastName), '-') as ReportsTo
        FROM Employees e
        RIGHT JOIN Employees emp ON emp.ReportsTo=e.EmployeeID
        ORDER BY emp.EmployeeId;
    `);
    return result[0];
}

/**
 *
 * Create a query to return:
 * | CategoryName | TotalNumberOfProducts |
 *
 * @return {array}
 *
 */
async function task_1_8(db) {
    let result = await db.query(`
        SELECT 
            CategoryName,
            COUNT(*) as 'TotalNumberOfProducts'
        FROM Categories c
        LEFT JOIN Products p ON p.CategoryID=c.CategoryID
        GROUP BY c.CategoryID;
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find those customers whose contact name containing the 1st character is 'F' and the 4th character is 'n' and rests may be any character.
 * | CustomerID | ContactName |
 *
 * @return {array}
 *
 */
async function task_1_9(db) {
    let result = await db.query(`
        SELECT 
            CustomerID,
            ContactName
        FROM Customers
        WHERE ContactName LIKE 'F__n%';
    `);
    return result[0];
}

/**
 * Write a query to get discontinued Product list:
 * | ProductID | ProductName |
 *
 * @return {array}
 *
 */
async function task_1_10(db) {
    let result = await db.query(`
        SELECT 
            ProductID,
            ProductName
        FROM Products
        WHERE Discontinued=1;
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list (name, unit price) where products cost between $5 and $15:
 * | ProductName | UnitPrice |
 *
 * Order by UnitPrice then by ProductName
 *
 * @return {array}
 *
 */
async function task_1_11(db) {
    let result = await db.query(`
        SELECT 
            ProductName,
            UnitPrice
        FROM Products
        WHERE UnitPrice BETWEEN 5 AND 15
        ORDER BY UnitPrice, ProductName;
    `);
    return result[0];
}

/**
 * Write a SQL query to get Product list of twenty most expensive products:
 * | ProductName | UnitPrice |
 *
 * Order products by price then by ProductName.
 *
 * @return {array}
 *
 */
async function task_1_12(db) {
    let result = await db.query(`
        SELECT * FROM 
            (SELECT 
                ProductName,
                UnitPrice 
            FROM Products
            ORDER BY UnitPrice DESC LIMIT 20) p
        ORDER BY UnitPrice, ProductName;
    `);
    return result[0];
}

/**
 * Create a SQL query to count current and discontinued products:
 * | TotalOfCurrentProducts | TotalOfDiscontinuedProducts |
 *
 * @return {array}
 *
 */
async function task_1_13(db) {
    let result = await db.query(`
        SELECT 
            COUNT(*) as 'TotalOfCurrentProducts',
            SUM(Discontinued) 'TotalOfDiscontinuedProducts'
        FROM Products;
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list of stock is less than the quantity on order:
 * | ProductName | UnitsInOrder| UnitsInStock |
 *
 * @return {array}
 *
 */
async function task_1_14(db) {
    let result = await db.query(`
        SELECT 
            ProductName,
            UnitsOnOrder,
            UnitsInStock
        FROM Products
        WHERE UnitsOnOrder > UnitsInStock;
    `);
    return result[0];
}

/**
 * Create a SQL query to return the total number of orders for every month in 1997 year:
 * | January | February | March | April | May | June | July | August | September | November | December |
 *
 * @return {array}
 *
 */
async function task_1_15(db) {
    let result = await db.query(`
        SELECT
            SUM(MONTH(OrderDate)=1) as 'January',
            SUM(MONTH(OrderDate)=2) as 'February',
            SUM(MONTH(OrderDate)=3) as 'March',
            SUM(MONTH(OrderDate)=4) as 'April',
            SUM(MONTH(OrderDate)=5) as 'May',
            SUM(MONTH(OrderDate)=6) as 'June',
            SUM(MONTH(OrderDate)=7) as 'July',
            SUM(MONTH(OrderDate)=8) as 'August',
            SUM(MONTH(OrderDate)=9) as 'September',
            SUM(MONTH(OrderDate)=10) as 'October',
            SUM(MONTH(OrderDate)=11) as 'November',
            SUM(MONTH(OrderDate)=12) as 'December'
        FROM Orders
        WHERE YEAR(OrderDate)=1997;
    `);
    return result[0];
}

/**
 * Create a SQL query to return all orders where ship postal code is provided:
 * | OrderID | CustomerID | ShipCountry |
 *
 * @return {array}
 *
 */
async function task_1_16(db) {
    let result = await db.query(`
        SELECT
            OrderID,
            CustomerID,
            ShipCountry
        FROM Orders
        WHERE ShipPostalCode IS NOT NULL;
    `);
    return result[0];
}

/**
 * Create SQL query to display the average price of each categories's products:
 * | CategoryName | AvgPrice |
 *
 * @return {array}
 *
 * Order by AvgPrice descending then by CategoryName
 *
 */
async function task_1_17(db) {
    let result = await db.query(`
        SELECT
            CategoryName,
            ROUND(AVG(UnitPrice), 4) as 'AvgPrice'
        FROM Categories c
        LEFT JOIN Products p
        ON c.CategoryID=p.CategoryID
        GROUP BY c.CategoryID
        ORDER BY \`AvgPrice\` DESC, CategoryName;
    `);
    return result[0];
}

/**
 * Create a SQL query to calcualte total orders count by each day in 1998:
 * | OrderDate | Total Number of Orders |
 *
 * Order Date needs to be in the format '%Y-%m-%d %T'
 * @return {array}
 *
 */
async function task_1_18(db) {
    let result = await db.query(`
        SELECT
            DATE_FORMAT(OrderDate, '%Y-%m-%d %T') as 'OrderDate',
            COUNT(*) as 'Total Number of Orders'
        FROM Orders
        WHERE YEAR(OrderDate)=1998
        GROUP BY OrderDate;
    `);
    return result[0];
}

/**
 * Create a SQL query to display customer details whose total orders amount is more than 10000$:
 * | CustomerID | CompanyName | TotalOrdersAmount, $ |
 *
 * Order by "TotalOrdersAmount, $" descending then by CustomerID
 * @return {array}
 *
 */
async function task_1_19(db) {
    let result = await db.query(`
        SELECT
            c.CustomerID,
            CompanyName,
            SUM(od.UnitPrice*od.Quantity) as 'TotalOrdersAmount, $'
        FROM Customers c
        LEFT JOIN Orders o ON c.CustomerID=o.CustomerID
        LEFT JOIN OrderDetails od ON od.OrderID=o.OrderID
        GROUP BY c.CustomerID
        HAVING \`TotalOrdersAmount, $\` > 10000
        ORDER BY \`TotalOrdersAmount, $\` DESC, CustomerID;
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find the employee that sold products for the largest amount:
 * | EmployeeID | Employee Full Name | Amount, $ |
 *
 * @return {array}
 *
 */
async function task_1_20(db) {
    let result = await db.query(`
        SELECT
            e.EmployeeID,
            CONCAT(FirstName, ' ', LastName) as 'Employee Full Name',
            SUM(od.UnitPrice*od.Quantity) as 'Amount, $'
        FROM Employees e
        LEFT JOIN Orders o ON e.EmployeeID=o.EmployeeID
        LEFT JOIN OrderDetails od ON od.OrderID=o.OrderID
        GROUP BY e.EmployeeID
        ORDER BY \`Amount, $\` DESC
        LIMIT 1;
    `);
    return result[0];
}

/**
 * Write a SQL statement to get the maximum purchase amount of all the orders.
 * | OrderID | Maximum Purchase Amount, $ |
 *
 * @return {array}
 */
async function task_1_21(db) {
    let result = await db.query(`
        SELECT
            OrderID,
            SUM(UnitPrice*Quantity) as 'Maximum Purchase Amount, $'
        FROM OrderDetails
        GROUP BY OrderID
        ORDER BY SUM(UnitPrice*Quantity) DESC
        LIMIT 1;
    `);
    return result[0];
}

/**
 * Create a SQL query to display the name of each customer along with their most expensive purchased product:
 * | CompanyName | ProductName | PricePerItem |
 *
 * order by PricePerItem descending and them by CompanyName and ProductName acceding
 * @return {array}
 */
async function task_1_22(db) {
    let result = await db.query(`
        SELECT DISTINCT
            c.CompanyName,
            p.ProductName,
            od.UnitPrice as 'PricePerItem'
        FROM Customers c
        INNER JOIN Orders o ON c.CustomerID=o.CustomerID
        INNER JOIN OrderDetails od ON od.OrderID=o.OrderID
        INNER JOIN Products p ON p.ProductID=od.ProductID
        INNER JOIN(SELECT c.CustomerID, MAX(od.UnitPrice) as 'MaxPrice' FROM Customers c
            INNER JOIN Orders o ON c.CustomerID=o.CustomerID
            INNER JOIN OrderDetails od ON od.OrderID=o.OrderID
            GROUP BY c.CustomerID) t ON t.CustomerID=c.CustomerID AND t.\`MaxPrice\`=od.UnitPrice
        ORDER BY od.UnitPrice DESC, c.CompanyName, p.ProductName;
    `);
    return result[0];
}

module.exports = {
    task_1_1: task_1_1,
    task_1_2: task_1_2,
    task_1_3: task_1_3,
    task_1_4: task_1_4,
    task_1_5: task_1_5,
    task_1_6: task_1_6,
    task_1_7: task_1_7,
    task_1_8: task_1_8,
    task_1_9: task_1_9,
    task_1_10: task_1_10,
    task_1_11: task_1_11,
    task_1_12: task_1_12,
    task_1_13: task_1_13,
    task_1_14: task_1_14,
    task_1_15: task_1_15,
    task_1_16: task_1_16,
    task_1_17: task_1_17,
    task_1_18: task_1_18,
    task_1_19: task_1_19,
    task_1_20: task_1_20,
    task_1_21: task_1_21,
    task_1_22: task_1_22
};
