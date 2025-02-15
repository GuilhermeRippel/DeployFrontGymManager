import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../../services/api";

const MyPieChart: React.FC = () => {
  const [alunos, setAlunos] = useState<[]>([]);
  const [funcionarios, setFuncionarios] = useState<[]>([]);

  const getInformationsGraphic = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      // 🔹 Busca alunos Manha
      const alunosManhaResponse = await api.get("/alunosData/DataManha", {
        headers: { Authorization: token },
      });

      // 🔹 Busca Funcionários Manha
      const funcionariosManhaResponse = await api.get("/listarFuncionario/ListarManha", {
        headers: {
            Authorization: token
        }
      })

      setFuncionarios(funcionariosManhaResponse.data.response)
      setAlunos(alunosManhaResponse.data.consultaAlunos);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInformationsGraphic();
  }, []);

  // 🔹 Valores do gráfico
  const alunosManhaNumber = alunos.length;
  const funcionariosManhaNumber = funcionarios.length

  const data = [
    { name: "Alunos Manhã", value: alunosManhaNumber },
    { name: "Funcionários Manhã", value: funcionariosManhaNumber },
  ];

  const COLORS = ["#EAB308", "#7C3AED"];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyPieChart;
