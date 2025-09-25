// E-commerce System
class EcommerceManager {
  constructor() {
    this.cart = this.loadCart();
    this.orders = this.loadOrders();
    this.wishlist = this.loadWishlist();
  }

  loadCart() {
    return Utils.storage.get('cart') || [];
  }

  saveCart() {
    Utils.storage.set('cart', this.cart);
  }

  loadOrders() {
    return Utils.storage.get('orders') || [];
  }

  saveOrders() {
    Utils.storage.set('orders', this.orders);
  }

  loadWishlist() {
    return Utils.storage.get('wishlist') || [];
  }

  saveWishlist() {
    Utils.storage.set('wishlist', this.wishlist);
  }

  addToCart(productId, quantity = 1) {
    const product = ECOMMERCE_PRODUCTS.find(p => p.id === productId);
    if (!product) {
      notifications.error('Product Not Found', 'The selected product is not available');
      return false;
    }

    const existingItem = this.cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        productId: productId,
        quantity: quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart();
    notifications.success('Added to Cart', `${product.name} has been added to your cart`);
    this.updateCartBadge();
    return true;
  }

  removeFromCart(productId) {
    const index = this.cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
      const product = ECOMMERCE_PRODUCTS.find(p => p.id === productId);
      this.cart.splice(index, 1);
      this.saveCart();
      notifications.info('Removed from Cart', `${product?.name || 'Item'} has been removed from your cart`);
      this.updateCartBadge();
      return true;
    }
    return false;
  }

  updateCartQuantity(productId, newQuantity) {
    const item = this.cart.find(item => item.productId === productId);
    if (item && newQuantity > 0) {
      item.quantity = newQuantity;
      this.saveCart();
      this.updateCartBadge();
      return true;
    } else if (newQuantity === 0) {
      return this.removeFromCart(productId);
    }
    return false;
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartBadge();
    notifications.info('Cart Cleared', 'All items have been removed from your cart');
  }

  getCartItems() {
    return this.cart.map(item => {
      const product = ECOMMERCE_PRODUCTS.find(p => p.id === item.productId);
      return {
        ...item,
        product: product,
        totalPrice: product ? product.price * item.quantity : 0
      };
    });
  }

  getCartTotal() {
    return this.getCartItems().reduce((total, item) => total + item.totalPrice, 0);
  }

  getCartItemCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  updateCartBadge() {
    // Update cart badge in the UI
    const cartBadges = document.querySelectorAll('.cart-badge');
    const itemCount = this.getCartItemCount();
    
    cartBadges.forEach(badge => {
      badge.textContent = itemCount;
      badge.style.display = itemCount > 0 ? 'inline' : 'none';
    });
  }

  showCart() {
    const cartItems = this.getCartItems();
    const total = this.getCartTotal();

    if (cartItems.length === 0) {
      const content = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-shopping-cart" style="font-size: 4rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
          <h3 style="margin-bottom: 1rem;">Your cart is empty</h3>
          <p style="color: var(--gray-600); margin-bottom: 2rem;">Browse our eco-friendly products and add items to your cart</p>
          <button class="btn btn-primary" onclick="modal.hide(); navigation.navigateTo('shop');">
            <i class="fas fa-store"></i>
            Continue Shopping
          </button>
        </div>
      `;
      modal.show('Shopping Cart', content);
      return;
    }

    const content = `
      <div class="shopping-cart">
        <div class="cart-items" style="max-height: 400px; overflow-y: auto;">
          ${cartItems.map(item => `
            <div class="cart-item" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--gray-200);">
              <div style="font-size: 2rem; width: 60px; text-align: center;">
                ${item.product.image}
              </div>
              <div style="flex: 1;">
                <h4 style="margin-bottom: 0.5rem;">${item.product.name}</h4>
                <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 0.5rem;">${item.product.description}</p>
                <div style="font-weight: 600; color: var(--primary);">${Utils.formatCurrency(item.product.price)} each</div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button class="btn btn-ghost" onclick="window.EcommerceManager.updateCartQuantity(${item.productId}, ${item.quantity - 1}); window.EcommerceManager.showCart();">-</button>
                <span style="min-width: 30px; text-align: center; font-weight: 600;">${item.quantity}</span>
                <button class="btn btn-ghost" onclick="window.EcommerceManager.updateCartQuantity(${item.productId}, ${item.quantity + 1}); window.EcommerceManager.showCart();">+</button>
              </div>
              <div style="min-width: 80px; text-align: right;">
                <div style="font-weight: 700; color: var(--primary);">${Utils.formatCurrency(item.totalPrice)}</div>
                <button class="btn btn-ghost" style="color: var(--error); font-size: 0.875rem; padding: 0.25rem 0.5rem;" onclick="window.EcommerceManager.removeFromCart(${item.productId}); window.EcommerceManager.showCart();">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="cart-summary" style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px solid var(--gray-200);">
          <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
            <span style="font-size: 1.25rem; font-weight: 600;">Total:</span>
            <span style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${Utils.formatCurrency(total)}</span>
          </div>
          
          <div style="display: flex; gap: 1rem;">
            <button class="btn btn-ghost" onclick="modal.hide()">Continue Shopping</button>
            <button class="btn btn-secondary" onclick="window.EcommerceManager.clearCart(); modal.hide();">Clear Cart</button>
            <button class="btn btn-primary" onclick="window.EcommerceManager.proceedToCheckout()">
              <i class="fas fa-credit-card"></i>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    `;

    modal.show(`Shopping Cart (${cartItems.length} items)`, content, { size: '700px' });
  }

  proceedToCheckout() {
    const cartItems = this.getCartItems();
    const total = this.getCartTotal();

    const content = `
      <div class="checkout-form">
        <h3 style="margin-bottom: 2rem; text-align: center;">Checkout</h3>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
          <div class="delivery-details">
            <h4 style="margin-bottom: 1rem;">Delivery Information</h4>
            
            <div class="form-group" style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name</label>
              <input type="text" class="form-control" id="deliveryName" placeholder="Enter full name" required>
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone Number</label>
              <input type="tel" class="form-control" id="deliveryPhone" placeholder="Enter phone number" required>
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Delivery Address</label>
              <textarea class="form-control" rows="3" id="deliveryAddress" placeholder="Enter complete delivery address" required></textarea>
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Delivery Time</label>
              <select class="form-control" id="deliveryTime" required>
                <option value="standard">Standard (3-5 business days) - Free</option>
                <option value="express">Express (1-2 business days) - ₹50</option>
                <option value="same-day">Same Day - ₹100</option>
              </select>
            </div>
            
            <div class="form-group" style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Special Instructions</label>
              <textarea class="form-control" rows="2" id="specialInstructions" placeholder="Any special delivery instructions..."></textarea>
            </div>
          </div>
          
          <div class="order-summary">
            <h4 style="margin-bottom: 1rem;">Order Summary</h4>
            
            <div class="summary-items" style="max-height: 200px; overflow-y: auto; margin-bottom: 1rem;">
              ${cartItems.map(item => `
                <div style="display: flex; justify-content: between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--gray-200); font-size: 0.875rem;">
                  <div>
                    <div style="font-weight: 600;">${item.product.name}</div>
                    <div style="color: var(--gray-600);">Qty: ${item.quantity}</div>
                  </div>
                  <div style="font-weight: 600;">${Utils.formatCurrency(item.totalPrice)}</div>
                </div>
              `).join('')}
            </div>
            
            <div class="pricing-breakdown" style="padding: 1rem; background: var(--gray-50); border-radius: 8px; margin-bottom: 1rem;">
              <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                <span>Subtotal:</span>
                <span>${Utils.formatCurrency(total)}</span>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                <span>Delivery:</span>
                <span id="deliveryCharge">Free</span>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 0.5rem;">
                <span>Tax (5%):</span>
                <span>${Utils.formatCurrency(total * 0.05)}</span>
              </div>
              <hr style="margin: 0.5rem 0;">
              <div style="display: flex; justify-content: between; font-weight: 700; font-size: 1.125rem;">
                <span>Total:</span>
                <span id="finalTotal">${Utils.formatCurrency(total * 1.05)}</span>
              </div>
            </div>
            
            <div class="payment-method" style="margin-bottom: 1rem;">
              <h5 style="margin-bottom: 0.5rem;">Payment Method</h5>
              <label style="display: block; margin-bottom: 0.5rem;">
                <input type="radio" name="payment" value="cod" checked> Cash on Delivery
              </label>
              <label style="display: block; margin-bottom: 0.5rem;">
                <input type="radio" name="payment" value="online"> Online Payment
              </label>
            </div>
          </div>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--gray-200);">
          <button class="btn btn-ghost" onclick="window.EcommerceManager.showCart()">Back to Cart</button>
          <button class="btn btn-primary" onclick="window.EcommerceManager.placeOrder()">
            <i class="fas fa-check"></i>
            Place Order
          </button>
        </div>
      </div>
    `;

    modal.show('Checkout', content, { size: '900px' });

    // Add delivery charge calculation
    const deliveryTimeSelect = document.getElementById('deliveryTime');
    const deliveryChargeSpan = document.getElementById('deliveryCharge');
    const finalTotalSpan = document.getElementById('finalTotal');

    if (deliveryTimeSelect && deliveryChargeSpan && finalTotalSpan) {
      deliveryTimeSelect.addEventListener('change', () => {
        const selectedOption = deliveryTimeSelect.value;
        let deliveryCharge = 0;
        
        switch (selectedOption) {
          case 'express':
            deliveryCharge = 50;
            break;
          case 'same-day':
            deliveryCharge = 100;
            break;
          default:
            deliveryCharge = 0;
        }
        
        const subtotalWithTax = total * 1.05;
        const finalTotal = subtotalWithTax + deliveryCharge;
        
        deliveryChargeSpan.textContent = deliveryCharge === 0 ? 'Free' : Utils.formatCurrency(deliveryCharge);
        finalTotalSpan.textContent = Utils.formatCurrency(finalTotal);
      });
    }
  }

  placeOrder() {
    const deliveryName = document.getElementById('deliveryName').value;
    const deliveryPhone = document.getElementById('deliveryPhone').value;
    const deliveryAddress = document.getElementById('deliveryAddress').value;
    const deliveryTime = document.getElementById('deliveryTime').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (!deliveryName || !deliveryPhone || !deliveryAddress) {
      notifications.warning('Missing Information', 'Please fill in all required delivery details');
      return;
    }

    const cartItems = this.getCartItems();
    const subtotal = this.getCartTotal();
    const deliveryCharge = this.getDeliveryCharge(deliveryTime);
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryCharge + tax;

    const order = {
      id: 'ORD' + Date.now(),
      items: cartItems,
      customer: {
        name: deliveryName,
        phone: deliveryPhone,
        address: deliveryAddress
      },
      delivery: {
        type: deliveryTime,
        charge: deliveryCharge,
        instructions: document.getElementById('specialInstructions').value
      },
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'cod' ? 'pending' : 'paid'
      },
      pricing: {
        subtotal: subtotal,
        tax: tax,
        deliveryCharge: deliveryCharge,
        total: total
      },
      status: 'confirmed',
      orderDate: new Date().toISOString(),
      estimatedDelivery: this.calculateEstimatedDelivery(deliveryTime)
    };

    this.orders.push(order);
    this.saveOrders();
    this.clearCart();

    notifications.success('Order Placed!', `Your order ${order.id} has been confirmed. You will receive a confirmation call shortly.`);
    modal.hide();

    // Show order confirmation
    setTimeout(() => {
      this.showOrderConfirmation(order);
    }, 1000);
  }

  getDeliveryCharge(deliveryType) {
    switch (deliveryType) {
      case 'express': return 50;
      case 'same-day': return 100;
      default: return 0;
    }
  }

  calculateEstimatedDelivery(deliveryType) {
    const now = new Date();
    let deliveryDate = new Date(now);

    switch (deliveryType) {
      case 'same-day':
        deliveryDate.setHours(now.getHours() + 6); // Same day, 6 hours later
        break;
      case 'express':
        deliveryDate.setDate(now.getDate() + 1); // Next day
        break;
      default:
        deliveryDate.setDate(now.getDate() + 3); // 3 days later
    }

    return deliveryDate.toISOString();
  }

  showOrderConfirmation(order) {
    const content = `
      <div class="order-confirmation" style="text-align: center;">
        <div style="color: var(--success); margin-bottom: 2rem;">
          <i class="fas fa-check-circle" style="font-size: 4rem; margin-bottom: 1rem;"></i>
          <h2>Order Confirmed!</h2>
        </div>
        
        <div class="order-details" style="text-align: left; max-width: 500px; margin: 0 auto;">
          <div style="background: var(--gray-50); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem;">Order Details</h4>
            <div style="margin-bottom: 0.5rem;"><strong>Order ID:</strong> ${order.id}</div>
            <div style="margin-bottom: 0.5rem;"><strong>Total Amount:</strong> ${Utils.formatCurrency(order.pricing.total)}</div>
            <div style="margin-bottom: 0.5rem;"><strong>Payment:</strong> ${order.payment.method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</div>
            <div style="margin-bottom: 0.5rem;"><strong>Estimated Delivery:</strong> ${Utils.formatDate(new Date(order.estimatedDelivery))}</div>
          </div>
          
          <div style="background: var(--primary); color: white; padding: 1rem; border-radius: 8px; margin-bottom: 2rem;">
            <h5 style="margin-bottom: 0.5rem;">What happens next?</h5>
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>You'll receive a confirmation call within 30 minutes</li>
              <li>Your order will be prepared and packed</li>
              <li>You'll get delivery updates via SMS</li>
              <li>Our delivery team will contact you before arrival</li>
            </ul>
          </div>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn btn-ghost" onclick="modal.hide()">Close</button>
          <button class="btn btn-primary" onclick="window.EcommerceManager.showOrderHistory()">
            <i class="fas fa-list"></i>
            View All Orders
          </button>
        </div>
      </div>
    `;

    modal.show('Order Confirmation', content, { size: '600px' });
  }

  showOrderHistory() {
    if (this.orders.length === 0) {
      const content = `
        <div style="text-align: center; padding: 2rem;">
          <i class="fas fa-box-open" style="font-size: 4rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
          <h3 style="margin-bottom: 1rem;">No orders yet</h3>
          <p style="color: var(--gray-600); margin-bottom: 2rem;">You haven't placed any orders. Browse our products and place your first order!</p>
          <button class="btn btn-primary" onclick="modal.hide(); navigation.navigateTo('shop');">
            <i class="fas fa-store"></i>
            Start Shopping
          </button>
        </div>
      `;
      modal.show('Order History', content);
      return;
    }

    const content = `
      <div class="order-history">
        <h3 style="margin-bottom: 2rem;">Your Orders</h3>
        
        <div class="orders-list" style="max-height: 500px; overflow-y: auto;">
          ${this.orders.map(order => `
            <div class="order-card" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
              <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem;">
                <div>
                  <h4 style="margin-bottom: 0.5rem;">Order ${order.id}</h4>
                  <div style="color: var(--gray-600); font-size: 0.875rem;">
                    Placed on ${Utils.formatDate(new Date(order.orderDate))}
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: 700; font-size: 1.125rem; color: var(--primary);">${Utils.formatCurrency(order.pricing.total)}</div>
                  <span class="badge badge-${order.status === 'delivered' ? 'success' : order.status === 'cancelled' ? 'error' : 'info'}">
                    ${Utils.capitalize(order.status)}
                  </span>
                </div>
              </div>
              
              <div style="margin-bottom: 1rem;">
                <strong>Items (${order.items.length}):</strong>
                <div style="margin-top: 0.5rem;">
                  ${order.items.map(item => `
                    <div style="display: flex; justify-content: between; font-size: 0.875rem; margin-bottom: 0.25rem;">
                      <span>${item.product.name} x${item.quantity}</span>
                      <span>${Utils.formatCurrency(item.totalPrice)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
              
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-ghost" onclick="window.EcommerceManager.trackOrder('${order.id}')">
                  <i class="fas fa-truck"></i>
                  Track Order
                </button>
                ${order.status === 'confirmed' ? `
                  <button class="btn btn-warning" onclick="window.EcommerceManager.cancelOrder('${order.id}')">
                    <i class="fas fa-times"></i>
                    Cancel
                  </button>
                ` : ''}
                <button class="btn btn-secondary" onclick="window.EcommerceManager.reorderItems('${order.id}')">
                  <i class="fas fa-redo"></i>
                  Reorder
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
          <button class="btn btn-ghost" onclick="modal.hide()">Close</button>
        </div>
      </div>
    `;

    modal.show('Order History', content, { size: '700px' });
  }

  trackOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      notifications.error('Order Not Found', 'The selected order could not be found');
      return;
    }

    const trackingStages = [
      { stage: 'confirmed', label: 'Order Confirmed', completed: true, time: order.orderDate },
      { stage: 'preparing', label: 'Preparing Order', completed: order.status !== 'confirmed', time: null },
      { stage: 'packed', label: 'Order Packed', completed: ['shipped', 'delivered'].includes(order.status), time: null },
      { stage: 'shipped', label: 'Out for Delivery', completed: order.status === 'delivered', time: null },
      { stage: 'delivered', label: 'Delivered', completed: order.status === 'delivered', time: null }
    ];

    const content = `
      <div class="order-tracking">
        <h3 style="margin-bottom: 2rem; text-align: center;">Track Order ${order.id}</h3>
        
        <div class="tracking-timeline" style="max-width: 500px; margin: 0 auto 2rem;">
          ${trackingStages.map((stage, index) => `
            <div class="tracking-stage" style="display: flex; align-items: start; gap: 1rem; margin-bottom: 2rem; ${index === trackingStages.length - 1 ? 'margin-bottom: 0;' : ''}">
              <div style="position: relative;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: ${stage.completed ? 'var(--success)' : 'var(--gray-300)'}; display: flex; align-items: center; justify-content: center; color: white;">
                  <i class="fas fa-${stage.completed ? 'check' : 'clock'}"></i>
                </div>
                ${index < trackingStages.length - 1 ? `
                  <div style="position: absolute; top: 40px; left: 50%; transform: translateX(-50%); width: 2px; height: 40px; background: ${stage.completed ? 'var(--success)' : 'var(--gray-300)'};"></div>
                ` : ''}
              </div>
              <div style="flex: 1; padding-top: 0.5rem;">
                <div style="font-weight: 600; color: ${stage.completed ? 'var(--success)' : 'var(--gray-600)'};">${stage.label}</div>
                ${stage.time ? `
                  <div style="font-size: 0.875rem; color: var(--gray-500); margin-top: 0.25rem;">
                    ${Utils.formatDate(new Date(stage.time))}
                  </div>
                ` : stage.completed ? `
                  <div style="font-size: 0.875rem; color: var(--gray-500); margin-top: 0.25rem;">
                    Completed
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="background: var(--gray-50); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem;">Delivery Information</h4>
          <div style="margin-bottom: 0.5rem;"><strong>Delivery Address:</strong> ${order.customer.address}</div>
          <div style="margin-bottom: 0.5rem;"><strong>Contact:</strong> ${order.customer.phone}</div>
          <div style="margin-bottom: 0.5rem;"><strong>Estimated Delivery:</strong> ${Utils.formatDate(new Date(order.estimatedDelivery))}</div>
          <div><strong>Delivery Type:</strong> ${Utils.capitalize(order.delivery.type.replace('-', ' '))} ${order.delivery.charge > 0 ? `(+${Utils.formatCurrency(order.delivery.charge)})` : '(Free)'}</div>
        </div>
        
        <div style="text-align: center;">
          <button class="btn btn-ghost" onclick="modal.hide()">Close</button>
          <button class="btn btn-secondary" onclick="window.EcommerceManager.contactSupport('${order.id}')">
            <i class="fas fa-phone"></i>
            Contact Support
          </button>
        </div>
      </div>
    `;

    modal.show(`Order Tracking - ${order.id}`, content, { size: '600px' });
  }

  cancelOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      notifications.error('Order Not Found', 'The selected order could not be found');
      return;
    }

    if (order.status !== 'confirmed') {
      notifications.warning('Cannot Cancel', 'This order cannot be cancelled as it has already been processed');
      return;
    }

    const content = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
        <h3>Cancel Order ${order.id}?</h3>
        <p style="color: var(--gray-600); margin: 1rem 0;">Are you sure you want to cancel this order? This action cannot be undone.</p>
      </div>
      
      <div style="background: var(--gray-50); padding: 1rem; border-radius: 8px; margin-bottom: 2rem;">
        <strong>Order Value:</strong> ${Utils.formatCurrency(order.pricing.total)}
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-ghost" onclick="modal.hide()">Keep Order</button>
        <button class="btn btn-error" onclick="window.EcommerceManager.confirmCancelOrder('${orderId}')">
          <i class="fas fa-times"></i>
          Yes, Cancel Order
        </button>
      </div>
    `;

    modal.show('Cancel Order', content);
  }

  confirmCancelOrder(orderId) {
    const orderIndex = this.orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = 'cancelled';
      this.orders[orderIndex].cancelledAt = new Date().toISOString();
      this.saveOrders();
      
      notifications.success('Order Cancelled', 'Your order has been cancelled successfully. Any payments will be refunded within 3-5 business days.');
      modal.hide();
      
      // Refresh order history if it's open
      setTimeout(() => {
        this.showOrderHistory();
      }, 1000);
    }
  }

  reorderItems(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      notifications.error('Order Not Found', 'The selected order could not be found');
      return;
    }

    // Add all items from the previous order to cart
    order.items.forEach(item => {
      this.addToCart(item.productId, item.quantity);
    });

    notifications.success('Items Added to Cart', 'All items from your previous order have been added to your cart');
    modal.hide();
  }

  contactSupport(orderId) {
    notifications.info('Support Contact', `Our support team will contact you shortly regarding order ${orderId}`);
  }

  addToWishlist(productId) {
    if (this.wishlist.includes(productId)) {
      notifications.info('Already in Wishlist', 'This item is already in your wishlist');
      return false;
    }

    this.wishlist.push(productId);
    this.saveWishlist();
    
    const product = ECOMMERCE_PRODUCTS.find(p => p.id === productId);
    notifications.success('Added to Wishlist', `${product?.name || 'Item'} has been added to your wishlist`);
    return true;
  }

  removeFromWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
      this.saveWishlist();
      
      const product = ECOMMERCE_PRODUCTS.find(p => p.id === productId);
      notifications.info('Removed from Wishlist', `${product?.name || 'Item'} has been removed from your wishlist`);
      return true;
    }
    return false;
  }

  getWishlistItems() {
    return this.wishlist.map(productId => {
      return ECOMMERCE_PRODUCTS.find(p => p.id === productId);
    }).filter(product => product !== undefined);
  }

  getOrderStats() {
    const totalOrders = this.orders.length;
    const totalSpent = this.orders.reduce((total, order) => total + order.pricing.total, 0);
    const completedOrders = this.orders.filter(o => o.status === 'delivered').length;
    const cancelledOrders = this.orders.filter(o => o.status === 'cancelled').length;

    return {
      totalOrders,
      totalSpent,
      completedOrders,
      cancelledOrders,
      completionRate: totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0
    };
  }
}

// Initialize e-commerce manager
window.EcommerceManager = new EcommerceManager();