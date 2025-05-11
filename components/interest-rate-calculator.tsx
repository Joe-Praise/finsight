'use client';
import React, { Suspense, useState } from 'react';
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
  CompoundingFrequency,
  CompoundingMap,
  InterestCalculator,
  InterestTypeEnum,
} from '@/lib/interest-math-module';
import { calculateDuration, thousandSeperator } from '@/lib/helper';
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
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DataTableDemo } from './interest-rate-table';
import useFormatText from '@/hooks/useFormatText';
import { cn } from '@/lib/utils';
import { FormattedNumberInput } from './currencyInput';

dayjs.extend(duration);

export interface IInterestConfig {
  type: InterestTypeEnum | null;
  principal: number | null;
  requiredReturn?: number | null;
  rate: number | null;
  months: number | null;
  compoundFrequency?: string | null;
  return?: number | null;
  duration?: number | null;
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

const details_break_down = [
  {
    title: 'Simple Interest',
    desc: `Calculated only on the initial deposit./n
Formula: A = P(1 + rt) /n
- A: Final amount /n
- P: Principal /n
- r: Annual interest rate /n
- t: Time in years`,
  },
  {
    title: 'Compound Interest',
    desc: `Interest is added to the principal at regular intervals, causing exponential growth. /n
Formula: A = P(1 + r/n)ⁿᵗ  /n
- n: Number of times compounded per year`,
  },
  {
    title: 'Continuous Interest',
    desc: `Interest compounds continuously, meaning it's added at every possible moment.  /n
Formula: A = Pe^(rt)  /n
- e: Euler’s number (≈ 2.718)`,
  },
  {
    title: 'Required Return',
    desc: `Used to calculate how much you need to invest now to earn a specific interest amount over time.  /n
Formula: P = A / (1 + r/n)ⁿᵗ  /n
- A: Desired final amount (principal + interest) /n
- r: Annual interest rate /n
- n: Compounding frequency /n
- t: Time in years`,
  },
];

const InterestRateCalculator = () => {
  const { formatText } = useFormatText();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [interestConfig, setInterestConfig] = useState<IInterestConfig>({
    type: null,
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
      ) ||
      interestConfig.type === null
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
      handleRequiredReturnCalculation(interestCalc);
    } else {
      handleStandardCalculation(interestCalc);
    }

    setOverlay((prev) => !prev);
    return;
  };

  const handleRequiredReturnCalculation = (
    interestCalc: InterestCalculator
  ) => {
    const neededDeposit = interestCalc.requiredDeposit(
      interestConfig.requiredReturn ?? 0,
      interestConfig.months ?? 1
    );
    setResult(neededDeposit.toString() ?? null);
    setInterestConfig((prev) => {
      return {
        ...prev,
        principal: neededDeposit,
      };
    });

    const results = generateResults(interestCalc, neededDeposit);
    const returnValue = results.at(-1);

    if (returnValue?.return !== undefined) {
      setResult(returnValue.return?.toString() ?? null);
      setTableResult(results);
    }
  };

  const handleStandardCalculation = (interestCalc: InterestCalculator) => {
    const results = generateResults(
      interestCalc,
      interestConfig.principal ?? 0
    );
    const returnValue = results.at(-1);

    if (returnValue !== undefined) {
      setResult(returnValue.return?.toString() ?? null);
      setTableResult(results);
    }
  };

  const generateResults = (
    interestCalc: InterestCalculator,
    principal: number
  ): Array<IInterestConfig> => {
    const results: Array<IInterestConfig> = [];
    for (
      let i = 1;
      i <= Math.min(interestConfig.months ?? 0, monthsBoundary);
      i++
    ) {
      const value = interestCalc.calculate(principal, i).toFixed(2);

      const data: IInterestConfig = {
        type: interestConfig.type,
        principal: principal,
        rate: interestConfig.rate,
        months: i,
        return: parseFloat(value.toString()),
        duration: i,
      };
      results.push(data);
    }
    return results;
  };

  const createResultStatement = () => {
    if (!interestConfig?.type || !result) {
      return 'Crunch the numbers and watch your interest appear.';
    }

    if (interestConfig.type === InterestTypeEnum['Required Return']) {
      return `You need to deposit ${thousandSeperator(
        Number(result).toFixed(2)
      )} to earn ${thousandSeperator(
        (interestConfig.requiredReturn ?? 0).toFixed(2)
      )} interest in ${calculateDuration(interestConfig.months ?? 0)} at ${
        interestConfig.rate
      }% compounded ${interestConfig.compoundFrequency}.`;
    }

    return `Your deposit of ${thousandSeperator(
      Number(interestConfig.principal ?? 0).toFixed(2)
    )} will earn you ${thousandSeperator(
      Number(result).toFixed(2)
    )} interest in ${calculateDuration(interestConfig.months ?? 0)} at ${
      interestConfig.rate
    }% compounded ${interestConfig.compoundFrequency}.`;
  };

  const cardsData = [
    {
      header: 'Principal Investment',
      value: result ? interestConfig.principal : 0,
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='h-4 w-4 text-muted-foreground'
        >
          <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
        </svg>
      ),
    },
    {
      header: 'Returns',
      value: result ? result : 0,
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='h-4 w-4 text-muted-foreground'
        >
          <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
        </svg>
      ),
    },
    {
      header: 'Interest Type',
      value: result ? interestConfig.type : 'waiting on you...',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='h-4 w-4 text-muted-foreground'
        >
          <rect width='20' height='14' x='2' y='5' rx='2' />
          <path d='M2 10h20' />
        </svg>
      ),
    },
  ];

  return (
    <div className='flex flex-col lg:flex-row min-h-screen w-full'>
      <div className='flex lg:flex-col items-center justify-between lg:justify-start p-4 lg:py-4 bg-background '>
        <Drawer>
          <DrawerTrigger asChild className=' ms-auto md:ms-0'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              className='lg:mb-4 group hover:bg-black dark:hover:bg-white'
            >
              <Menu className='h-6 w-6 group-hover:text-white dark:group-hover:text-black' />
              <span className='sr-only'>
                {isDescriptionOpen ? 'Close' : 'Open'} description
              </span>
            </Button>
          </DrawerTrigger>

          <DrawerContent className='h-screen md:h-auto'>
            <DrawerHeader className='text-left sticky top-0'>
              <DrawerTitle>Interest Rate Visualizer</DrawerTitle>
              <DrawerDescription>
                The Interest Rate Visualizer is an interactive tool designed to
                help users understand and compare different types of interest
                calculations: Simple Interest, Compound Interest, and Continuous
                Interest. By visualizing how investments or loans grow over
                time, this application provides insights into the impact of
                various interest rates and compounding frequencies.
              </DrawerDescription>
            </DrawerHeader>

            <div className='p-4 flex flex-col gap-3 overflow-y-auto '>
              <Card className='flex flex-col px-1 border-none'>
                <CardHeader>
                  <CardTitle>Types of Interest</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 p-0'>
                  <ul className='list-disc list-inside text-sm text-muted-foreground space-y-2 flex-col gap-3'>
                    {details_break_down?.map((detail, index) => (
                      <li key={`${detail.title}_${detail.desc}_${index}__key`}>
                        <span className='font-medium text-primary'>
                          {detail.title}:{' '}
                        </span>
                        {formatText(detail.desc).map((textBlock, idx) => (
                          <p
                            key={idx}
                            className={cn({
                              'inline-block ml-1': idx === 0,
                              'ml-5': idx > 0,
                            })}
                          >
                            {textBlock}
                          </p>
                        ))}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <DrawerFooter className='sticky bottom-0 mt-auto'>
              <DrawerClose asChild className='mx-auto'>
                <Button className='w-max'>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <Card className='flex-1 overflow-hidden'>
        <CardContent className='p-4 lg:p-6'>
          <div className='mb-6'>
            <Label htmlFor='globalMaxRetries'>
              Max Months: {monthsBoundary} (50 years)
            </Label>
            <p>{createResultStatement()}</p>
          </div>

          <Dialog open={overlay} onOpenChange={setOverlay}>
            <DialogTrigger asChild>
              <Button
                className='mb-4 w-full lg:w-auto'
                // onClick={() => setOverlay((prev) => !prev)}
              >
                Calculate Interest
              </Button>
            </DialogTrigger>
            <DialogContent
              className='sm:max-w-[425px]'
              aria-describedby='dialog-description'
            >
              <DialogHeader>
                <DialogTitle>{'Calculate Interest'}</DialogTitle>
              </DialogHeader>
              <p id='dialog-description'>
                This form allows you to calculate interest by specifying the
                type, principal, rate, and duration.
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
                      <option selected>Select one</option>
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
                      <FormattedNumberInput
                        placeholder={'Enter Amount'}
                        value={interestConfig.requiredReturn ?? null}
                        onChange={(val) =>
                          setInterestConfig((prev) => ({
                            ...prev,
                            requiredReturn: val,
                          }))
                        }
                        id='requiredReturn'
                        name='requiredReturn'
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor='principal'>Amount</Label>
                      <FormattedNumberInput
                        placeholder={'Enter Amount'}
                        value={interestConfig.principal}
                        onChange={(val) =>
                          setInterestConfig((prev) => ({
                            ...prev,
                            principal: val,
                          }))
                        }
                        id='principal'
                        name='principal'
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor='rate'>Rate (%)</Label>
                    <FormattedNumberInput
                      id='rate'
                      name='rate'
                      value={interestConfig.rate ?? null}
                      placeholder='Enter Rate'
                      onChange={(val) =>
                        setInterestConfig((prev) => ({
                          ...prev,
                          rate: val,
                        }))
                      }
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
                      placeholder='Enter Duration(months)'
                    />
                  </div>
                </div>
                <Button
                  type='button'
                  //   disabled={

                  //   }
                  className='w-full'
                  onClick={() => {
                    handleRunCalculation(
                      interestConfig.type ?? InterestTypeEnum.Simple
                    );
                  }}
                >
                  Calculate
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <div className='my-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {cardsData.map((data, index) => {
              return (
                <Card
                  className='border py-2 px-4'
                  key={`${data.icon}__${index}`}
                >
                  <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      {data.header}
                    </CardTitle>
                    <span>{data.icon}</span>
                  </CardHeader>
                  <CardContent className='px-1 py-3'>
                    <div className='text-xl font-bold'>
                      {data.header.toLowerCase() ===
                      'Interest Type'.toLowerCase()
                        ? data.value
                        : thousandSeperator(data.value ?? 0)}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {/* <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                  <circle cx='9' cy='7' r='4' />
                  <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>+2350</div>
                <p className='text-xs text-muted-foreground'>
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <rect width='20' height='14' x='2' y='5' rx='2' />
                  <path d='M2 10h20' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>+12,234</div>
                <p className='text-xs text-muted-foreground'>
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Users
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>+573</div>
                <p className='text-xs text-muted-foreground'>
                  +201 since last hour
                </p>
              </CardContent>
            </Card> */}
          </div>

          <DataTableDemo data={tableResult} />
        </CardContent>
      </Card>
    </div>
  );
};

const InterestRateCalculatorWithSuspense = () => {
  return (
    <Suspense>
      <InterestRateCalculator />
    </Suspense>
  );
};
export default InterestRateCalculatorWithSuspense;
