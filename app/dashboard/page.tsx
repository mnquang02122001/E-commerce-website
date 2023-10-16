import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { prisma } from "@/util/prisma";

export const revalidate = 0;

const fetchOrders = async () => {
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
    },
    include: { products: true },
  });
  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  if (orders === null) {
    return <div>You need to be logged in to view your orders</div>;
  }
  if (orders.length === 0) {
    return (
      <div>
        <h1>No orders placed</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="font-medium">
        {orders.map(
          (order) =>
            order.status === "complete" && (
              <div
                key={order.id}
                className="rounded-lg p-8 my-4 space-y-2 bg-base-200"
              >
                <h2 className="text-xs font-medium">
                  Order reference: {order.id}
                </h2>
                <p className="text-xs">
                  Status:{" "}
                  <span
                    className={`${
                      order.status === "complete"
                        ? "bg-teal-500"
                        : "bg-orange-500"
                    } text-white py-1 rounded-md px-2 mx-2 text-xs`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-xs">
                  Time: {new Date(order.createdDate).toString()}
                </p>
                {/* <p className="font-medium">Total: {formatPrice(order.amount)}</p> */}
                <div className="text-sm lg:flex items-center gap-2">
                  {order.products.map((product) => (
                    <div className="py-2" key={product.id}>
                      <h2 className="py-2">{product.name}</h2>
                      <div className="flex items-baseline gap-4">
                        <Image
                          src={product.image!}
                          width={36}
                          height={36}
                          alt={product.name}
                          priority
                          className="w-auto"
                        />
                        <p>{formatPrice(product.unit_amount)}</p>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
