# bAmazon

## This is my bamazon store using MySQL & Node.js

### The store is seen through the perspective of a **Consumer** & **Manager**

### _**CUSTOMER OVERVIEW**_

1. It will show the available items for sale
1. Allows the user to make a purchase of multiple units of an item
1. Will prompt the total price of the units of the item
1. The database will then update with the total units being deduced by the number of units selected by the user

---

1. **OPTIONS**

    ![Options](images/options.PNG)
1. **SHOW ITEMS FOR SALE**

    ![Items for sale](images/itemsToBuy.PNG)
1. **USER WILL CHOOSE HOW MANY UNITS TO BUY**
    1. **IF THERE IS ENOUGH IN STOCK WILL SHOW PRICE TOTAL**

    ![price total](images/promptPrice.PNG)

    2. **IF THERE IS NOT ENOUGH IN STOCK WILL SHOW _INSUFFICENT QUANTITY_**

    ![Insuficient](images/tooMuch.PNG)

1. **DATABASE TABLE PRIOR TO PURCHASE**

    ![dbPrior](images/dbPrePurchase.PNG)

1. **DATABASE TABLE UPDATED AFTER PURCHASE**

    ![dbPost](images/dbUpdate.PNG)

---

### _**MANAGER OVERVIEW**_

1. It will show available products
1. To search for _low_ inventory the user can input a number and it will show inventory for products that have an amount less than the amount entered.
1. The manager is allowed to _add-more_ of any item currently in store.

--- 

_**Application walk through:**_

1. **INITIAL OPTIONS**

    ![Man Options](images/ManPrompt.PNG)

1. **VIEW ITEMS**

    ![View Inventory](images/ManForSale.PNG)

1. **VIEW LOW INVENTORY**

    ![Low Inventory](images/ManLowIn.PNG)

1. **RE-STOCK ITEMS**

    ![Re-stock](images/ManReStock.PNG)

1. **DATABASE :: RE-STOCK :: UPDATE**

    ![Db update](images/mandbrestockup.PNG)