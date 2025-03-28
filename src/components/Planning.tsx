// Planning Component
import { useEffect, useState } from "react";
import axios from "axios";

export default function Planning({ userId }: { userId: number }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/intro-section-backend/planning.php", { params: { user_id: userId } })
      .then((res) => setPlans(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Planning</h2>
      {plans.length > 0 ? (
        <ul className="space-y-2">
          {plans.map((plan: any) => (
            <li key={plan.id} className="border p-2 rounded bg-white shadow">
              {plan.plan_description} - <span>{plan.plan_date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No plans found.</p>
      )}
    </div>
  );
}
