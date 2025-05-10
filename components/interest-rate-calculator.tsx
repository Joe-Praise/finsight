'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  CompoundingFrequency,
  CompoundingMap,
  InterestCalculator,
  InterestTypeEnum,
} from '@/lib/interest-math-module';
import { calculateDuration } from '@/lib/helper';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface IInterestConfig {
  type: InterestTypeEnum;
  principal: number | null;
  requiredReturn?: number | null;
  rate: number | null;
  months: number | null;
  compoundFrequency?: string | null;
  return?: number | null;
}

const interestType = [
  {
    label: 'Simple',
    value: InterestTypeEnum.Simple,
  },
  {
    label: 'Compound',
    value: InterestTypeEnum.Compound,
  },
  {
    label: 'Continuous',
    value: InterestTypeEnum.Continuous,
  },
  {
    label: 'Required Deposit',
    value: InterestTypeEnum['Required Return'],
  },
];

const frequencyType = Object.keys(CompoundingMap).map((key) => {
  return {
    label: key,
    value: key.toLowerCase(),
  };
});

const InterestRateCalculator = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [interestConfig, setInterestConfig] = useState<IInterestConfig>({
    type: InterestTypeEnum.Simple,
    principal: null,
    rate: null,
    months: null,
    return: null,
    requiredReturn: null,
    compoundFrequency: 'annually',
  });
  const monthsBoundary = 600;
  const [tableResult, setTableResult] = useState<Array<IInterestConfig>>([]);

  const [result, setResult] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setInterestConfig((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleRunCalculation = (type: string) => {
    if (
      !(
        interestConfig.principal ||
        interestConfig.rate ||
        interestConfig.months
      )
    )
      return;

    const interestCalc = new InterestCalculator({
      rate: interestConfig.rate ?? 0,
      frequency:
        (interestConfig.compoundFrequency as CompoundingFrequency) ??
        ('monthly' as CompoundingFrequency),
      type: type as InterestTypeEnum,
      locale: 'en-US',
      currency: 'USD',
    });

    if (interestConfig.type === InterestTypeEnum['Required Return']) {
      const neededDeposit = interestCalc.requiredDeposit(
        interestConfig.requiredReturn ?? 0,
        interestConfig.months ?? 1
      );

      console.log(
        '🚀 ~ handleRunCalculation ~ neededDeposit:',
        neededDeposit.toFixed(2)
      );
    } else {
      const results: Array<IInterestConfig> = [];
      for (
        let i = 1;
        i <= Math.min(interestConfig.months ?? 0, monthsBoundary);
        i++
      ) {
        const value = interestCalc
          .calculate(interestConfig.principal ?? 0, i)
          .toFixed(2);

        const data: IInterestConfig = {
          type: interestConfig.type,
          principal: interestConfig.principal,
          rate: interestConfig.rate,
          months: i,
          return: parseFloat(value.toString()),
        };
        results.push(data);
      }
      const returnValue = results.at(-1);
      if (returnValue !== undefined) {
        setResult(returnValue.return?.toString() ?? null);
        setTableResult(results);
      }
    }
    setOverlay((prev) => !prev);
    return;
  };

  function thousandSeperator(value: number) {
    const formatter = new Intl.NumberFormat('en-US');
    return formatter.format(value);
  }

  const constructResultMessage = () => {
    const result = calculateDuration(interestConfig.months ?? 0);
    // FIXME: update value to appropriately return the result string.
    return ` ${result}`;
  };

  const details_break_down = [
    {
      title: 'Simple Interest',
      desc: 'Calculated on the principal alone using the formula A = P(1 + rt), where growth remains linear over time.',
    },
    {
      title: 'Compound Interest',
      desc: 'Interest is added to the principal at regular intervals, leading to exponential growth using A = P(1 + r/n)ⁿᵗ.',
    },
    {
      title: 'Continuous Interest',
      desc: 'The ultimate form of compounding, where interest is applied infinitely using A = Pe^(rt), leading to the fastest growth.',
    },
  ];

  return (
    <div className='flex flex-col lg:flex-row min-h-screen w-full'>
      <div className='flex lg:flex-col items-center justify-between lg:justify-start p-4 lg:py-4 bg-background'>
        <Drawer>
          <DrawerTrigger>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              className='lg:mb-4 group'
            >
              <Menu className='h-6 w-6 group-hover:text-white  dark:group-hover:text-white' />
              <span className='sr-only'>
                {isDescriptionOpen ? 'Close' : 'Open'} description
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className='text-left'>
              <DrawerTitle>Interest Rate Visulaizer</DrawerTitle>
              <DrawerDescription>
                The Interest Rate Visualizer is an interactive tool designed to
                help users understand and compare different types of interest
                calculations: Simple Interest, Compound Interest, and Continuous
                Interest. By visualizing how investments or loans grow over
                time, this application provides insights into the impact of
                various interest rates and compounding frequencies.
              </DrawerDescription>
            </DrawerHeader>
            <div className='p-4 h-full flex flex-col gap-3'>
              <Card className='flex-grow overflow-hidden flex flex-col px-1 border-none'>
                <CardHeader>
                  <CardTitle>Types of Interest</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto p-0'>
                  <div>
                    <ul className='list-disc list-inside text-sm text-muted-foreground space-y-2 flex-col gap-3'>
                      {details_break_down?.map((detail, index) => {
                        return (
                          <li
                            key={`${detail.title}_${detail.desc}_${index}__key`}
                          >
                            <span className='font-medium text-primary'>
                              {detail.title}:
                            </span>{' '}
                            {detail.desc}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <Card className='flex-1 overflow-hidden'>
        <CardContent className='p-4 lg:p-6'>
          <div className='mb-6'>
            <Label htmlFor='globalMaxRetries'>
              Max Months: {monthsBoundary}
            </Label>
            <p>
              Result:{' '}
              {result
                ? thousandSeperator(Number(parseFloat(result).toFixed()))
                : 0}{' '}
              after {constructResultMessage()}{' '}
            </p>
          </div>

          <Dialog open={overlay} onOpenChange={setOverlay}>
            <DialogTrigger asChild>
              <Button
                className='mb-4 w-full lg:w-auto'
                // onClick={() => setOverlay((prev) => !prev)}
              >
                Add New Configuration
              </Button>
            </DialogTrigger>
            <DialogContent
              className='sm:max-w-[425px]'
              aria-describedby='dialog-description'
            >
              <DialogHeader>
                <DialogTitle>{'Add New Configuration'}</DialogTitle>
              </DialogHeader>
              <p id='dialog-description'>
                This form allows you to add a new interest configuration by
                specifying the type, principal, rate, and duration.
              </p>
              <form className='space-y-4'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='type'>Interest Type</Label>
                    <select
                      id='type'
                      name='type'
                      value={interestConfig.type || undefined}
                      onChange={handleInputChange}
                      className='w-full p-2 border rounded'
                    >
                      {interestType.map((type, index) => (
                        <option
                          key={`${type.value}__${index}_key`}
                          value={type.value}
                        >
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {(interestConfig.type === InterestTypeEnum.Compound ||
                    interestConfig.type ===
                      InterestTypeEnum['Required Return']) && (
                    <div>
                      <Label htmlFor='compoundFrequency'>
                        Compound Frequency
                      </Label>
                      <select
                        id='compoundFrequency'
                        name='compoundFrequency'
                        value={interestConfig.compoundFrequency || undefined}
                        onChange={handleInputChange}
                        className='w-full p-2 border rounded capitalize'
                      >
                        {frequencyType.map((type, index) => (
                          <option
                            key={`${type.value}__${index}_key`}
                            value={type.value}
                          >
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {interestConfig.type ===
                  InterestTypeEnum['Required Return'] ? (
                    <div>
                      <Label htmlFor='requiredReturn'>Required Return</Label>
                      <Input
                        id='requiredReturn'
                        name='requiredReturn'
                        type='text' // Changed from 'number' to 'text' to allow commas
                        inputMode='numeric'
                        pattern='[0-9,]*'
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          // Remove non-numeric characters
                          let value = target.value.replace(/[^\d]/g, '');
                          // Remove leading zeros
                          value = value.replace(/^0+(?=\d)/, '');
                          // Format with thousand separators
                          value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          target.value = value;
                        }}
                        value={
                          interestConfig.requiredReturn
                            ? interestConfig.requiredReturn.toLocaleString()
                            : ''
                        }
                        onChange={(e) => {
                          // Remove commas before converting to number
                          const numericValue = e.target.value.replace(/,/g, '');
                          const event = {
                            ...e,
                            target: {
                              ...e.target,
                              value: numericValue,
                              name: 'requiredReturn',
                              type: 'number',
                            },
                          };
                          handleInputChange(event);
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor='principal'>Amount</Label>
                      <Input
                        id='principal'
                        name='principal'
                        type='text' // Changed from 'number' to 'text' to allow commas
                        inputMode='numeric'
                        pattern='[0-9,]*'
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          // Remove non-numeric characters
                          let value = target.value.replace(/[^\d]/g, '');
                          // Remove leading zeros
                          value = value.replace(/^0+(?=\d)/, '');
                          // Format with thousand separators
                          value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          target.value = value;
                        }}
                        value={
                          interestConfig.principal
                            ? interestConfig.principal.toLocaleString()
                            : ''
                        }
                        onChange={(e) => {
                          // Remove commas before converting to number
                          const numericValue = e.target.value.replace(/,/g, '');
                          const event = {
                            ...e,
                            target: {
                              ...e.target,
                              value: numericValue,
                              name: 'principal',
                              type: 'number',
                            },
                          };
                          handleInputChange(event);
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor='rate'>Rate (%)</Label>
                    <Input
                      id='rate'
                      name='rate'
                      type='number'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/^0+(?=\d)/, '');
                      }}
                      value={interestConfig.rate ?? ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor='months'>Duration (months)</Label>
                    <Input
                      id='months'
                      name='months'
                      type='number'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/^0+(?=\d)/, '');
                      }}
                      value={interestConfig.months ?? ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button
                  type='button'
                  //   disabled={

                  //   }
                  className='w-full'
                  onClick={() => {
                    handleRunCalculation(interestConfig.type);
                  }}
                >
                  {'Add'} Configuration
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <div className='overflow-x-auto'>
            <Table className='mb-6'>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>
                    Duration <small>(months)</small>
                  </TableHead>
                  <TableHead>Interest Type</TableHead>
                  <TableHead>Principle</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableResult.map((config, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{config.type} </TableCell>
                    <TableCell>
                      {thousandSeperator(config.principal ?? 0)}
                    </TableCell>
                    <TableCell>{config.rate}%</TableCell>
                    <TableCell>
                      {thousandSeperator(config.return ?? 0) || 'N/A'}
                    </TableCell>
                    {/* <TableCell>{config?.jitter ? 'Yes' : 'No'}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* <div className="h-[300px] lg:h-[400px]" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="retryCount" 
              type="number"
              domain={[0, globalMaxRetries]}
              tickFormatter={(value) => `${value}`}
              label={{ value: "Number of Retries", position: "bottom", offset: 0 }}
            />
            <YAxis 
              tickFormatter={(value) => formatTime(value)}
              width={80}
            />
            <Tooltip 
              formatter={(value: number) => formatTime(value)}
              labelFormatter={(label: number) => `Retry Count: ${label}`}
            />
            <Legend 
              verticalAlign="top"
              align="center"
              layout="horizontal"
              margin={{ top: 0, left: 0, right: 0, bottom: 10 }}
            />
            {configs.map((_, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={`Config ${index + 1}`}
                stroke={`hsl(${index * 137.5 % 360}, 70%, 50%)`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleExport} className="w-full lg:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Export Chart and Configuration
        </Button>
      </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterestRateCalculator;
