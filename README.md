# bAmazon

## This is my bamazon store using MySQL & Node.js

### The store is seen through the perspective of a **Consumer View**

1. It will show the available items for sale
1. Allows the user to make a purchase of multiple units of an item
1. Will prompt the total price of the units of the item
1. The database will then update with the total units being deduced by the number of units selected by the user

---

1. **OPTIONS**

    ![Options](/images/options.png)
1. **SHOW ITEMS FOR SALE**

    ![Items for sale](/images/itemsToBuy.png)
1. **USER WILL CHOOSE HOW MANY UNITS TO BUY**
    1. **IF THERE IS ENOUGH IN STOCK WILL SHOW PRICE TOTAL**

    ![price total](/images/promptPrice.png)
    2. **IF THERE IS NOT ENOUGH IN STOCK WILL SHOW _INSUFFICENT QUANTITY_**

    ![Insuficient](/images/tooMuch.png)

1. **DATABASE TABLE PRIOR TO PURCHASE**

    ![dbPrior](/images/dbPrePurchase.png)

1. **DATABASE TABLE UPDATED AFTER PURCHASE**
    ![dbPost](/images/dbUpdate.png)