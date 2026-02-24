import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell
} from 'recharts';

export const MortalityChart = () => {
  const data = [
    { year: '2014', deaths: 246 },
    { year: '2023', deaths: 379 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#24526E', fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}
        />
        <YAxis hide />
        <Tooltip
          cursor={{ fill: 'rgba(52, 187, 206, 0.05)' }}
          contentStyle={{
            borderRadius: '16px',
            border: 'none',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif'
          }}
          labelStyle={{ fontWeight: 'bold', color: '#24526E' }}
          formatter={(value: any) => [value, 'Óbitos']}
        />
        <Bar dataKey="deaths" barSize={48} radius={[12, 12, 0, 0]}>
          <Cell fill="#24526E" opacity={0.2} />
          <Cell fill="#34BBCE" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const JudicialChart = () => {
  const data = [
    { name: 'FRAUDE EVITADA', value: 1600000, color: '#f3f4f6' },
    { name: 'FRAUDE OPERAÇÃO', value: 656000, color: '#ef4444' },
    { name: 'BLOQUEIO LEGÍTIMO', value: 384000, color: '#34BBCE' },
    { name: 'INVESTIMENTO SOCIAL', value: 145000, color: '#24526E' },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 80, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          width={150}
          tick={{ fontSize: 9, fill: '#24526E', fontWeight: 800, letterSpacing: '0.5px' }}
        />
        <Tooltip
          cursor={{ fill: 'rgba(52, 187, 206, 0.03)' }}
          contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px', fontFamily: 'Inter' }}
          formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Impacto']}
        />
        <Bar dataKey="value" radius={[0, 15, 15, 0]} barSize={32}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
